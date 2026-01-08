from dataclasses import dataclass

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
        td:int
        inter:int
        #sack:int
        fum:int
        qbrat:float
        week:int
        rushing:int
        rushing_td:int