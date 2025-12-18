
class ParseData:
    def __init__(self, soup, QB, parsedIDs):
        self.soup = soup
        self.QB=QB
        self.data_list=[]
        self.week = self._get_week()
        self.parsedIDs = parsedIDs
    
    def _getDataRows(self):
        tables  = self.soup.find_all('table')
        qb_table = tables[6]
        rows = qb_table.find_all('tr')
        self.rows = rows[2:len(rows)]
        
    def _format_name(self,name):
        return name.split(",")[0]
    
    def _get_week(self):
        header = self.soup.find('h1')
        header_split = header.text.split()
        return int(header_split[-1])
    
    def _get_id(self,data):
        a = data[1].find('a')
        href = a["href"]
        id = href.split('/')[-2]
        return int(id)
    
    def _makeDataList(self):
        for row in self.rows:
            data = row.find_all('td')
            id = self._get_id(data)
            qb = self.QB(
                    name=self._format_name(data[1].text),
                    id =id,
                    team=data[2].text,
                    result=data[3].text,
                    comp=data[4].text,
                    att=data[5].text,
                    yds=data[6].text,
                    td=data[7].text,
                    inter=data[8].text,
                    sack=data[9].text,
                    fum=data[10].text,
                    rat=data[11].text, 
                    week = self.week
            )
            if id not in self.parsedIDs:
                self.data_list.append(qb)
                self.parsedIDs[id] = True
    
    def returnData(self):
        self._getDataRows()
        self._makeDataList()
        return self.data_list