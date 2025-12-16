
class ParseData:
    def __init__(self, soup, QB):
        self.soup = soup
        self.QB=QB
        self.data_list=[]
        self.week = self._get_week()
    
    def _getDataRows(self):
        tables  = self.soup.find_all('table')
        qb_table = tables[6]
        rows = qb_table.find_all('tr')
        self.rows = rows[2:len(rows)]
        
    def _format_name(self,name):
        return name.split(",")[0]
    
    def _get_week(self):
        header = self.soup.find('h1')
        return int(header.text[-1:])
    
    def _makeDataList(self):
        for row in self.rows:
            data = row.find_all('td')
            qb = self.QB(name=self._format_name(data[1].text),
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
            self.data_list.append(qb)
    
    def returnData(self):
        self._getDataRows()
        self._makeDataList()
        return self.data_list