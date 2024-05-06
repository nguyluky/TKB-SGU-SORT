from typing import Any
from dataclasses import dataclass

@dataclass
class RespExcept:
    result: bool
    code: int
    message: str
    validatedmessage: None
    time: None

    @staticmethod
    def from_dict(obj: Any) -> 'RespExcept':
        assert isinstance(obj, dict)
        result = bool(obj.get("result"))
        code = int(obj.get("code"))
        message = str(obj.get("message"))
        validatedmessage = obj.get("validated_message")
        time = obj.get("time")
        return RespExcept(result, code, message, validatedmessage, time)

    def to_dict(self) -> dict:
        result: dict = {}
        result["result"] = bool(self.result)
        result["code"] = int(self.code)
        result["message"] = str(self.message)
        result["validated_message"] = self.validatedmessage
        result["time"] = self.time
        return result