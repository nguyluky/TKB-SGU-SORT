from typing import Optional, Any, TypeVar, Type, cast


T = TypeVar("T")


def from_int(x: Any) -> int:
    assert isinstance(x, int) and not isinstance(x, bool)
    return x


def from_none(x: Any) -> Any:
    assert x is None
    return x


def from_union(fs, x):
    for f in fs:
        try:
            return f(x)
        except:
            pass
    assert False


def from_bool(x: Any) -> bool:
    assert isinstance(x, bool)
    return x


def from_str(x: Any) -> str:
    assert isinstance(x, str)
    return x


def is_type(t: Type[T], x: Any) -> T:
    assert isinstance(x, t)
    return x


def to_class(c: Type[T], x: Any) -> dict:
    assert isinstance(x, c)
    return cast(Any, x).to_dict()


class LoginResp:
    id_user: Optional[int]
    session: Optional[int]
    id: None
    name: None
    full_name: None
    error: None
    principal: None
    access_token: None
    refresh_token: None
    user_name: None
    roles: None
    info: None
    iddvpc: None
    tatcapc: Optional[bool]
    adminph: None
    adminpc: Optional[bool]
    passtype: Optional[int]
    user_level: Optional[int]
    result: Optional[bool]
    code: Optional[int]
    idpc: Optional[str]
    message: Optional[str]
    validated_message: None
    time: None
    wcf: Optional[int]
    expires: Optional[str]
    issued: Optional[str]

    def __init__(self, id_user: Optional[int], session: Optional[int], id_: None, name: None, full_name: None, error: None, principal: None, access_token: None, refresh_token: None, user_name: None, roles: None, info: None, iddvpc: None, tatcapc: Optional[bool], adminph: None, adminpc: Optional[bool], passtype: Optional[int], user_level: Optional[int], result: Optional[bool], code: Optional[int], idpc: Optional[str], message: Optional[str], validated_message: None, time: None, wcf: Optional[int], expires: Optional[str], issued: Optional[str]) -> None:
        self.id_user = id_user
        self.session = session
        self.id_ = id_
        self.name = name
        self.full_name = full_name
        self.error = error
        self.principal = principal
        self.access_token = access_token
        self.refresh_token = refresh_token
        self.user_name = user_name
        self.roles = roles
        self.info = info
        self.iddvpc = iddvpc
        self.tatcapc = tatcapc
        self.adminph = adminph
        self.adminpc = adminpc
        self.passtype = passtype
        self.user_level = user_level
        self.result = result
        self.code = code
        self.idpc = idpc
        self.message = message
        self.validated_message = validated_message
        self.time = time
        self.wcf = wcf
        self.expires = expires
        self.issued = issued

    @staticmethod
    def from_dict(obj: Any) -> 'LoginResp':
        assert isinstance(obj, dict)
        id_user             = from_union([from_int, from_none], obj.get("IDUser"))
        session             = from_union([from_int, from_none], obj.get("Session"))
        id_                 = from_union([from_str, from_none], obj.get("id"))
        name                = from_union([from_str, from_none], obj.get("name"))
        full_name           = from_union([from_str, from_none], obj.get("FullName"))
        error               = obj.get("error")
        principal           = obj.get("principal")
        access_token        = from_union([from_str, from_none], obj.get("access_token"))
        refresh_token       = from_union([from_str, from_none], obj.get("refresh_token"))
        user_name           = from_union([from_str, from_none], obj.get("userName"))
        roles               = from_union([from_str, from_none], obj.get("roles"))
        info                = obj.get("info")
        iddvpc              = obj.get("IDDVPC")
        tatcapc             = from_union([from_bool, from_none], obj.get("tatcapc"))
        adminph             = obj.get("adminph")
        adminpc             = from_union([from_bool, from_none], obj.get("adminpc"))
        passtype            = from_union([from_int, from_str, from_none], obj.get("passtype"))
        user_level          = from_union([from_int, from_str, from_none], obj.get("UserLevel"))
        result              = from_union([from_bool, from_str, from_none], obj.get("result"))
        code                = from_union([from_int, from_str, from_none], obj.get("code"))
        idpc                = from_union([from_str, from_none], obj.get("idpc"))
        message             = from_union([from_str, from_none], obj.get("message"))
        validated_message   = obj.get("validated_message")
        time                = obj.get("time")
        wcf                 = from_union([from_none, lambda x: int(from_str(x))], obj.get("wcf"))
        expires             = from_union([from_str, from_none], obj.get(".expires"))
        issued              = from_union([from_str, from_none], obj.get(".issued"))
        return LoginResp(id_user, session, id_, name, full_name, error, principal, access_token, refresh_token, user_name, roles, info, iddvpc, tatcapc, adminph, adminpc, passtype, user_level, result, code, idpc, message, validated_message, time, wcf, expires, issued)


def login_resp_from_dict(s: Any) -> LoginResp:
    return LoginResp.from_dict(s)


def login_resp_to_dict(x: LoginResp) -> Any:
    return to_class(LoginResp, x)
