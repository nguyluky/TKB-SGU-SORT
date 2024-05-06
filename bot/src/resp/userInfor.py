from typing import List
from typing import Any
from dataclasses import dataclass
import json

@dataclass
class UserInfo:
    thoi_gian_get_data: str
    ma_sv: str
    ten_day_du: str
    gioi_tinh: str
    ngay_sinh: str
    noi_sinh: str
    dan_toc: str
    ton_giao: str
    quoc_tich: str
    dien_thoai: str
    email: str
    email2: str
    doi_mat_khau: bool
    so_cmnd: str
    ho_khau_thuong_tru_gd: str
    lop: str
    khu_vuc: str
    doi_tuong_uu_tien: str
    doi_tuong_xet_TN: str
    khoi: str
    nganh: str
    chuyen_nganh: str
    id_chuyen_nganh: str
    khoa: str
    bac_he_dao_tao: str
    nien_khoa: str
    ma_cvht: str
    ho_ten_cvht: str
    email_cvht: str
    dien_thoai_cvht: str
    ma_cvht_ng2: str
    ho_ten_cvht_ng2: str
    email_cvht_ng2: str
    dien_thoai_cvht_ng2: str
    ma_truong: str
    ten_truong: str
    id_dia_phuong: str
    id_khoa: str
    id_sinh_vien: str
    id_lop: str
    id_khoi: str
    id_bac_he_nganh: str
    id_bac_he: str
    id_he: str
    id_quy_che: str
    id_quy_che_P: str
    id_hoc_che: str
    id_don_vi_phan_cap: str
    id_co_so_lop: str
    nhhk_vao: int
    nhhk_ra: int
    id_lop2: str
    id_khoi2: str
    id_bac_he_nganh2: str
    chuyen_nganh2: str
    is_master_pass: bool
    is_cvht_dang_nhap: bool
    is_phu_huynh_dang_nhap: bool
    int_hien_dien_sv: int
    hien_dien_sv: str
    int_hien_dien_dkmh: int
    ds_menu_cam_xem: List[object]
    str_hoan_thanh_dgrl: str
    url_netweb: str

    @staticmethod
    def from_dict(obj: Any) -> 'UserInfo':
        _thoi_gian_get_data = str(obj.get("thoi_gian_get_data"))
        _ma_sv = str(obj.get("ma_sv"))
        _ten_day_du = str(obj.get("ten_day_du"))
        _gioi_tinh = str(obj.get("gioi_tinh"))
        _ngay_sinh = str(obj.get("ngay_sinh"))
        _noi_sinh = str(obj.get("noi_sinh"))
        _dan_toc = str(obj.get("dan_toc"))
        _ton_giao = str(obj.get("ton_giao"))
        _quoc_tich = str(obj.get("quoc_tich"))
        _dien_thoai = str(obj.get("dien_thoai"))
        _email = str(obj.get("email"))
        _email2 = str(obj.get("email2"))
        _doi_mat_khau = obj.get("doi_mat_khau")
        _so_cmnd = str(obj.get("so_cmnd"))
        _ho_khau_thuong_tru_gd = str(obj.get("ho_khau_thuong_tru_gd"))
        _lop = str(obj.get("lop"))
        _khu_vuc = str(obj.get("khu_vuc"))
        _doi_tuong_uu_tien = str(obj.get("doi_tuong_uu_tien"))
        _doi_tuong_xet_TN = str(obj.get("doi_tuong_xet_TN"))
        _khoi = str(obj.get("khoi"))
        _nganh = str(obj.get("nganh"))
        _chuyen_nganh = str(obj.get("chuyen_nganh"))
        _id_chuyen_nganh = str(obj.get("id_chuyen_nganh"))
        _khoa = str(obj.get("khoa"))
        _bac_he_dao_tao = str(obj.get("bac_he_dao_tao"))
        _nien_khoa = str(obj.get("nien_khoa"))
        _ma_cvht = str(obj.get("ma_cvht"))
        _ho_ten_cvht = str(obj.get("ho_ten_cvht"))
        _email_cvht = str(obj.get("email_cvht"))
        _dien_thoai_cvht = str(obj.get("dien_thoai_cvht"))
        _ma_cvht_ng2 = str(obj.get("ma_cvht_ng2"))
        _ho_ten_cvht_ng2 = str(obj.get("ho_ten_cvht_ng2"))
        _email_cvht_ng2 = str(obj.get("email_cvht_ng2"))
        _dien_thoai_cvht_ng2 = str(obj.get("dien_thoai_cvht_ng2"))
        _ma_truong = str(obj.get("ma_truong"))
        _ten_truong = str(obj.get("ten_truong"))
        _id_dia_phuong = str(obj.get("id_dia_phuong"))
        _id_khoa = str(obj.get("id_khoa"))
        _id_sinh_vien = str(obj.get("id_sinh_vien"))
        _id_lop = str(obj.get("id_lop"))
        _id_khoi = str(obj.get("id_khoi"))
        _id_bac_he_nganh = str(obj.get("id_bac_he_nganh"))
        _id_bac_he = str(obj.get("id_bac_he"))
        _id_he = str(obj.get("id_he"))
        _id_quy_che = str(obj.get("id_quy_che"))
        _id_quy_che_P = str(obj.get("id_quy_che_P"))
        _id_hoc_che = str(obj.get("id_hoc_che"))
        _id_don_vi_phan_cap = str(obj.get("id_don_vi_phan_cap"))
        _id_co_so_lop = str(obj.get("id_co_so_lop"))
        _nhhk_vao = int(obj.get("nhhk_vao"))
        _nhhk_ra = int(obj.get("nhhk_ra"))
        _id_lop2 = str(obj.get("id_lop2"))
        _id_khoi2 = str(obj.get("id_khoi2"))
        _id_bac_he_nganh2 = str(obj.get("id_bac_he_nganh2"))
        _chuyen_nganh2 = str(obj.get("chuyen_nganh2"))
        _is_master_pass = obj.get("is_master_pass")
        _is_cvht_dang_nhap = obj.get("is_cvht_dang_nhap")
        _is_phu_huynh_dang_nhap = obj.get("is_phu_huynh_dang_nhap")
        _int_hien_dien_sv = int(obj.get("int_hien_dien_sv"))
        _hien_dien_sv = str(obj.get("hien_dien_sv"))
        _int_hien_dien_dkmh = int(obj.get("int_hien_dien_dkmh"))
        _ds_menu_cam_xem = [y for y in obj.get("ds_menu_cam_xem")]
        _str_hoan_thanh_dgrl = str(obj.get("str_hoan_thanh_dgrl"))
        _url_netweb = str(obj.get("url_netweb"))
        return UserInfo(_thoi_gian_get_data, _ma_sv, _ten_day_du, _gioi_tinh, _ngay_sinh, _noi_sinh, _dan_toc, _ton_giao, _quoc_tich, _dien_thoai, _email, _email2, _doi_mat_khau, _so_cmnd, _ho_khau_thuong_tru_gd, _lop, _khu_vuc, _doi_tuong_uu_tien, _doi_tuong_xet_TN, _khoi, _nganh, _chuyen_nganh, _id_chuyen_nganh, _khoa, _bac_he_dao_tao, _nien_khoa, _ma_cvht, _ho_ten_cvht, _email_cvht, _dien_thoai_cvht, _ma_cvht_ng2, _ho_ten_cvht_ng2, _email_cvht_ng2, _dien_thoai_cvht_ng2, _ma_truong, _ten_truong, _id_dia_phuong, _id_khoa, _id_sinh_vien, _id_lop, _id_khoi, _id_bac_he_nganh, _id_bac_he, _id_he, _id_quy_che, _id_quy_che_P, _id_hoc_che, _id_don_vi_phan_cap, _id_co_so_lop, _nhhk_vao, _nhhk_ra, _id_lop2, _id_khoi2, _id_bac_he_nganh2, _chuyen_nganh2, _is_master_pass, _is_cvht_dang_nhap, _is_phu_huynh_dang_nhap, _int_hien_dien_sv, _hien_dien_sv, _int_hien_dien_dkmh, _ds_menu_cam_xem, _str_hoan_thanh_dgrl, _url_netweb)