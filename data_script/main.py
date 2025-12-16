import pandas as pd
from LoadData import LoadData
from GetURLs import GetURLs
from ParseData import ParseData
from QB import QB

if __name__ == "__main__":
    start_url = 'https://www.espn.com/nfl/weekly/leaders/_/week/1/type/passing'
    load_week_1 = LoadData(url=start_url)
    soup_1 = load_week_1.parsedHTML()
    
    getURLs = GetURLs(soup=soup_1, startingURL=start_url)
    urls = getURLs.getURLS()
    
    data_list = []
    
    for url in urls:
        loadData = LoadData(url=url)
        soup = loadData.parsedHTML()
        parse_data = ParseData(soup=soup, QB=QB)
        data_list.extend(parse_data.returnData())
        
    df = pd.DataFrame(data_list)
    
    df.to_csv('../qbr_vis/data/qb_data.csv')