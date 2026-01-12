from QB import CollegeQB

class CollegeURLS:
    def __init__(self):
        self.urls =[];
        
    def _make_urls(self):
        for i in range (1,16):
            self.urls.append(f"https://www.espn.com/college-football/scoreboard/_/week/{i}/year/2025/seasontype/2/group/80")
        
    def make_urls(self):
        self._make_urls()
        self.urls.append('https://www.espn.com/college-football/scoreboard/_/week/1/year/2025/seasontype/3/group/80')
        return self.urls
        


class GetBoxScoreURLS:
    def __init__(self,urls, LoadData):
        self.urls = urls 
        self.LoadData = LoadData;
        self._links =[]
        
    def _get_sections(self, loadData):
          return loadData.find_all('section', class_='gameModules')
        
    def _get_all_game_links(self, sections):
        game_links = []
        for s in sections:
            score_links = s.find_all('div', class_='Scoreboard__Callouts')
            game_links.extend(score_links)
        return game_links
    
    def _get_links(self, game_links):
        scoreboard_links = []
        for links in game_links:
            a = links.find_all('a')
            if(len(a)>1):
                link = a[1]['href']
                scoreboard_links.append(link)
        return scoreboard_links
        
    
    def getURLs(self):
        for url in self.urls:
            loadData = self.LoadData(url=url)
            sections = self._get_sections(loadData =loadData.parsedHTML() )
            game_links = self._get_all_game_links(sections=sections)
            links = self._get_links(game_links=game_links)
            self._links.extend(links)
            
        return self._links
                
                
                
class ParseCollegeBoxScore:
    def __init__(self, LoadData, url, CQB, week):
        self.LoadData = LoadData
        self.url = url
        self.CQB =CQB
        self.week =week
    
    def _load_page(self):
        load_data = self.LoadData(url=self.url)
        return load_data.parsedHTML();
    
    def _get_home_and_away(self,page):
        away_bs = []
        home_bs = []
        
        box_score_cat = page.find_all('div', class_='Boxscore__Category')
        for bsc in box_score_cat:
            box_score = bsc.find_all('div', class_='Boxscore__Team')
            if len(box_score) == 0:
                away_bs.append(None)
                home_bs.append(None)
            elif box_score[0].find('table', class_='EmptyBoxScore__Table') != None:
                away_bs.append(None)
            elif box_score[1].find('table', class_='EmptyBoxScore__Table') != None:
                home_bs.append(None)
            else:
                away_bs.append(box_score[0])
                home_bs.append(box_score[1])
            
        return [away_bs, home_bs];
    
    def _get_qbs(self, h_a):
        qb_ids = []
        qb_section = h_a[0] 
        qb_div = qb_section.find_all('div', class_='Boxscore__Athlete')
        for div in qb_div:
            id = self._get_qb_id(div)
            if id != None:
                qb_ids.append(id)
        return qb_ids
    
    def _get_qb_id(self, el):
        qb_link = el.find('a', class_='Boxscore__Athlete_Name')
        if qb_link != None:
            href = qb_link['href']
            split_href = href.split('/')
            id = split_href[len(split_href)-2]
            return id;
        return None
    
    def _find_qb(self,row,id):
         a = row.find('a', class_='Boxscore__Athlete_Name')
         string_id = str(id)
         if a != None and string_id in a['href']:
             return True
         return False
     
    def _get_name(self, row):
        a = row.find('a', class_='Boxscore__Athlete_Name')
        return a.get_text()
    
    def _parse_passing(self,row):
        tds = row.find_all('td', class_='Table__TD')
        c_att = tds[0].text.split('/')
        return {'c':c_att[0], 'att':c_att[1], 'yds': tds[1].text, 'avg': tds[2].text, 'td':tds[3].text, 'int':tds[4].text, 'qbr':tds[6].text}
    
    def _parse_rushing(self, row):
        tds = row.find_all('td', class_='Table__TD')
        return {'car': tds[0].text, 'rushing_yds': tds[1].text, 'rush_avg': tds[2].text, 'rush_td':tds[3].text}
    
    def _parse_fumble(self, row):
        tds = row.find_all('td', class_='Table__TD')
        return tds[0].text
    
    def _parse_name(self, row):
         qb_link = row.find('a', class_='Boxscore__Athlete_Name')
         return qb_link.text
     
    def _determine_playoff(self,week, page):
        if week<16:
            return False
        game_strip = page.find('div', class_='Gamestrip__StickyContainer')
        playoff_name_cont = game_strip.find('div', class_='uUds')
        if playoff_name_cont == None:
            return False
        playoff_name_cont = playoff_name_cont.find('span', class_='dkQfO')
        bowl_name = playoff_name_cont.text
        if 'College Football Playoff' not in  bowl_name:
            return False
        if 'First Round' in bowl_name:
            return 'First Round' 
        if 'Quarterfinal' in bowl_name:
            return 'Quarterfinal'
        if 'Semifinal' in bowl_name:
            return 'Semifinal'
        if 'National Championship' in bowl_name:
            return 'National Championship'
        return False
        
        
    def _get_data_from_id(self,id, boxscore, result, team,playoff):
        name=None
        result=result
        comp=None
        att=None
        yds=None
        passing_avg=None
        td=None
        inter=None
        #sack:int
        fum=None
        qbr_rat=None
        week=None
        rushing=None
        rush_avg=None
        rushing_yds =None
        rushing_tds=None
        
        for i,section in enumerate(boxscore):
            if (i ==0 or i==1 or i==3):
                if section == None and i == 1:
                    rushing=0
                    rushing_td=0
                    rush_avg=0
                    rushing_yds=0
                if section == None and i == 3:
                    fum=0
               
                if section != None:
                    tables = section.find_all('table', class_='Table')
                    if tables is None and i==1:
                        rushing=0
                        rushing_tds=0
                        rush_avg=0
                        rushing_yds=0
                    if tables is None and i==3:
                        fum=0
                
                    name_table = tables[0]
                    data_table = tables[1]
                    name_body = name_table.find('tbody', class_='Table__TBODY')
                    data_body = data_table.find('tbody', class_='Table__TBODY')
                    name_rows = name_body.find_all('tr', class_='Table__TR')
                    data_rows = data_body.find_all('tr', class_='Table__TR')
                    qb_row = False
                    for k, row in enumerate(name_rows):
                        if self._find_qb(row,id):
                            qb_row = k
                    if qb_row == False and i==1:
                        rushing=0
                        rushing_tds=0
                    if qb_row == False and i==3:
                        fum=0
                    if i==0:
                        passing_data = self._parse_passing(data_rows[qb_row])
                        name = self._parse_name(name_rows[qb_row])
                        comp = int(passing_data['c'])
                        yds = int(passing_data['yds'])
                        passing_avg=float(passing_data['avg'])
                        att=int(passing_data['att'])
                        td=int(passing_data['td'])
                        inter=int(passing_data['int'])
                        qbr_rat = None if passing_data['qbr'] =='--' else ( None if passing_data['qbr'] =='' else float(passing_data['qbr']))
                    if i==1 and rushing != 0:
                        rushing_data = self._parse_rushing(data_rows[qb_row])
                        # {'car': tds[0].text, 'rushing_yds': tds[1].text, 'rush_avg': tds[2].text, 'rush_td':tds[3].text}
                        rushing=int(rushing_data['car'])
                        rush_avg=float(rushing_data['rush_avg'])
                        rushing_yds =int(rushing_data['rushing_yds'])
                        rushing_tds=int(rushing_data['rush_td'])
                    if i==3 and fum !=0:
                        fum = int(self._parse_fumble(data_rows[qb_row]))
                
        return self.CQB(
                    name =name,
                    id=id, 
                    team=team, 
                    result=result, 
                    comp=comp,
                    att=att,
                    yds=yds,
                    inter=inter,
                    passing_avg=passing_avg,
                    td=td,
                    fum=fum,
                    qbr_rat=qbr_rat,
                    week=self.week,
                    carries=rushing,
                    rushing_yds=rushing_yds,
                    rushing_tds=rushing_tds,
                    rushing_avg=rush_avg,
                    playoff=playoff
                    )
        
    def _get_result(self,page):
        header = page.find('div', class_='Gamestrip__Container') 
        teams  = header.find_all('span', class_='NMnSM')
        score = header.find_all('div', class_='WULrS')
        return [teams[0].text+" "+score[0].text+ "-"+teams[1].text+' '+score[1].text, teams[0].text, teams[1].text]
        
    def qbs(self):
        college_qbs = []
        page = self._load_page()
        playoff = self._determine_playoff(self.week,page)
        result_team = self._get_result(page)
        home_and_away = self._get_home_and_away(page)
        for i, boxscore in enumerate(home_and_away):
            qbids = self._get_qbs(boxscore)
            for id in qbids:
                college_qb = self._get_data_from_id(id,boxscore, result_team[0], result_team[i+1], playoff)
                college_qbs.append(college_qb)
        
        return college_qbs
                
                
        
        

    