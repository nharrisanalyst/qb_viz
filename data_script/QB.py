from dataclasses import dataclass

@dataclass
class QB:
    name:str
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