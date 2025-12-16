import requests
from bs4 import BeautifulSoup

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Referer': 'https://www.espn.com/', # Good practice
}

class LoadData:
    def __init__(self, url):
        self.url = url 
        
    def _getData(self):
        self.response = requests.get(self.url, headers=headers)
        
    def parsedHTML(self):
        self._getData()
        return BeautifulSoup(self.response.text, "html.parser")
    