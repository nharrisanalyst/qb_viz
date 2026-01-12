import pandas as pd
from LoadData import LoadData
from GetURLs import GetURLs
from ParseData import ParseData
from CollegeParse import CollegeURLS, GetBoxScoreURLS, ParseCollegeBoxScore
from QB import QB, CollegeQB

if __name__ == "__main__":
    # start_url = 'https://www.espn.com/nfl/weekly/leaders/_/week/1/type/passing'
    # sub_urls = ['/sort/comp', '/sort/att', '/sort/yds', '/sort/td', '/sort/int', '/sort/sack','sort/fum', 'sort/qbrat']
    # load_week_1 = LoadData(url=start_url)
    # soup_1 = load_week_1.parsedHTML()
    
    # getURLs = GetURLs(soup=soup_1, startingURL=start_url)
    # urls = getURLs.getURLS()
    
    # data_list = []
    
    # for url in urls:
    #     idsParsed = {};
    #     for sub_url in sub_urls:
    #         full_url = url + sub_url
    #         loadData = LoadData(url=full_url)
    #         soup = loadData.parsedHTML()
    #         parse_data = ParseData(soup=soup, QB=QB, parsedIDs=idsParsed)
    #         data_list.extend(parse_data.returnData())
        
    # df = pd.DataFrame(data_list)
    
    # df.to_csv('../qbr_vis/public/data/qb_data.csv')
    
    #college
    url_base = 'https://www.espn.com'
    college_qb_list = []
    college_urls = CollegeURLS()
    college_urls_urls  = college_urls.make_urls()
    print(college_urls_urls, len(college_urls_urls))
    for i, college_url in enumerate(college_urls_urls):
        week = i+1
        college_box_score_urls = GetBoxScoreURLS(urls= [college_url], LoadData=LoadData)
        for url in college_box_score_urls.getURLs():
            print(url, week)
            parsed_college_boxscore = ParseCollegeBoxScore(url=url_base+url, LoadData=LoadData, CQB=CollegeQB, week=week)
            college_qb_list.extend(parsed_college_boxscore.qbs())
    df_c = pd.DataFrame(college_qb_list)
    df_c.to_csv('../qbr_vis/public/data/college_qb_data.csv')
    