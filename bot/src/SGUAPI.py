# import requests
from resp.LoginResp import LoginResp
from resp.userInfor import UserInfo
from resp.respExcept import RespExcept
import httpx

class SguAPI:
    def __init__(self, token = None, client = None) -> None:
        self.baseUrl = "https://thongtindaotao.sgu.edu.vn/api"
        self.token = token;
        self.client = client

    async def __login(self, userName:str, password:str) -> LoginResp:
        """return login resp conten t

        Args:
            userName (str): _description_
            password (str): _description_
        """
        resp = await self.post('/auth/login', {}, f"username={userName}&password={password}&grant_type=password")
        loginResp = LoginResp.from_dict(resp.json())
        self.token = loginResp.access_token;
        return loginResp
    
    async def getUserInfo(self) -> UserInfo | RespExcept:

        if self.token == None: # chưa đăng nhập
            raise ValueError("Not login")
        
        resp = await self.post('/dkmh/w-locsinhvieninfo', {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.token}"
        },None)

        json_data:dict = resp.json()
        if (json_data.get('result')):
            return UserInfo.from_dict(json_data['data'])
        return RespExcept.from_dict(json_data)
    
    async def dangKy():
        # TODO
        pass

    async def post(self, url, headers, data):
        if (self.client):
            pass
        resp = httpx.post(self.baseUrl + url, headers=headers, data=data)
        return resp
    

if __name__ == "__main__":
    import os
    print(os.getenv("USER_TEST"))
    # a = SguAPI(token="eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ii03NzM3NTUzMjE0NTEyNDg3MTAyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IjMxMjM1NjAwMjciLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiI4OTQ4MTcyNDQ0NDg2MDQxMTYyIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiU0lOSFZJRU4iLCJzZXNzaW9uIjoiLTg4NzM2Njk5NDYxMDU4NTI3NDIiLCJkdnBjIjoiLTc2NDg0NjY0NTU5NjU0MzQ0NzgiLCJuYW1lIjoiTmd1eeG7hW4gS2jhuq9jIEhp4bq_dSIsInBhc3N0eXBlIjoiMCIsInVjdiI6IjE0ODMyODQzODEiLCJwcmluY2lwYWwiOiJuZ3V5ZW5raGFjaGlldTExN0BnbWFpbC5jb20iLCJ3Y2YiOiIwIiwibmJmIjoxNzEzMTg0MTI0LCJleHAiOjE3MTMxOTEzMjQsImlzcyI6ImVkdXNvZnQiLCJhdWQiOiJhbGwifQ.biO8lRbkCYGciv9c5bVJzKIM4de8-1fNmr7k-tr98Is")
    a = SguAPI()
    # print(a.token)
    print(a.getUserInfo())
