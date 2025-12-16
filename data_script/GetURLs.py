from typing import List

class GetURLs:
    def __init__(self, soup, startingURL):
        self.soup = soup
        self.urlList = [startingURL]

    def _find_urls_in_soup(self):
        main_div = self.soup.find('div', class_ ='mod-content')
        a_tags = main_div.find_all('a')
        a_weeks = a_tags[4:]
        for a in  a_weeks:
            url = a["href"][2:]
            self.urlList.append(f'https://{url}')
        
    def getURLS(self):
        self._find_urls_in_soup()
        return  self.urlList