from dataclasses import dataclass
from typing import Literal

@dataclass
class QB:
    name:str
    id:int
    team:str
    result:str
    comp:int
    att:int
    yds:int
    td:int
    inter:int
    sack:int
    fum:int
    rat:float
    week:int
    
@dataclass
class CollegeQB:
    name:str
    id:int
    team:str
    result:str
    comp:int
    att:int
    yds:int
    passing_avg:float
    td:int
    inter:int
    #sack:int
    fum:int
    qbr_rat:float| None
    week:int
    carries:int
    rushing_yds:int
    rushing_tds:int
    rushing_avg:float
    playoff:False | Literal['First Round', 'Quarterfinal', 'Semifinal', 'National Championship']