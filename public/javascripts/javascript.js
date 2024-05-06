var data = null;
var isSave = true;
let filterItem = {};
// Khi người dùng click thêm học phần
const button_themhocphan = document.querySelector(".button_themhocphan");
const add_themhocphan = document.querySelector(".add_themhocphan");

// TODO khi nguoi dung chuat phai vao hoc phan
async function initFile() {
  console.log(tkb_id);
  if (!tkb_id) {
    loadHocPhanFromSessionStorage();
    return;
  }
  var a = createPopup("info", "get tkb save", -1);
  var req = await fetch(
    `${urlApis.getTkb}?` +
      new URLSearchParams({
        tkb_id: tkb_id,
      })
  );
  var data_json = await req.json();
  console.log(data_json);

  if (data_json.err_mess) {
    a.remove();
    console.log("err");
    createPopup("err", data_json.err_mess, -1);
    return;
  }

  var load = true;

  data_json.data.json_data.forEach((id_to_hoc) => {
    data.ds_nhom_to.forEach((e) => {
      if (e.id_to_hoc == id_to_hoc) {
        // console.log(e)

        addHp(e.ma_mon);
        var ele = document.querySelector(
          `div.list-hp div[id-to-hoc="${e.id_to_hoc}"]`
        );
        ele.click();
        load = false;
        // tkb.render(e)
      }
    });
  });

  a.remove();
  createPopup("success", "Tải thời khóa biểu thành công");

  if (load) loadHocPhanFromSessionStorage();

  isSave = true;
  console.log("set true");
}

function buttonThemHocPhanInit() {
  function xoaThemhocphan() {
    button_themhocphan.classList.remove("active");
    button_themhocphan.innerHTML = `
            <i class='bx bx-plus'></i>
            <span class="themhocphan">Thêm Học phần</span>
    `;
    button_themhocphan.disabled = false;
    document.body.removeEventListener("click", xoaThemhocphan);
  }

  button_themhocphan.onclick = (event) => {
    button_themhocphan.classList.add("active");
    button_themhocphan.innerHTML = `<i class='bx bx-search-alt icon_themhhocphan'></i>`;

    var input = document.createElement("input");
    input.setAttribute("placeholder", "Tìm học phần");

    var div = document.createElement("div");
    div.className = "search-suggest";
    div.style.display = "none";

    // fiter
    input.addEventListener("keyup", (event) => {
      var t = event.target.value;

      var max_ = 10;

      div.childNodes.forEach((e) => {
        if (t == "") {
          e.style.display = "none";
          return;
        }

        if (max_ == 0) {
        } else if (e.textContent.toLowerCase().includes(t.toLowerCase())) {
          max_--;
          e.style.display = "";
        } else if (e.getAttribute("id_hp").includes(e)) {
          max_--;
          e.style.display = "";
        } else e.style.display = "none";
      });

      if (max_ == 10) {
        div.style.display = "none";
      } else div.style.display = "";
    });

    // tạo đề xuất
    Object.keys(data.ds_mon_hoc).forEach((e) => {
      var option = document.createElement("div");
      option.className = "search-option";
      option.setAttribute("id_hp", e);
      option.onclick = function () {
        addHp(`${e}`);
        xoaThemhocphan();
      };
      option.textContent = `${data.ds_mon_hoc[e]} - ${e}`;
      option.style.display = "none";
      div.appendChild(option);
    });

    button_themhocphan.appendChild(input);
    button_themhocphan.appendChild(div);

    event.stopPropagation();
    setTimeout(() => {
      document.querySelector("#add-button > input").focus();
    }, 100);
    document.body.addEventListener("click", xoaThemhocphan);
    button_themhocphan.disabled = true;
  };
}
buttonThemHocPhanInit();

// sử lý sợ kiện khi người dùng nhấn vào menu
function menuInit() {
  var popup_is_show = false;
  var popup_show = null;

  function hind_popup() {
    document.querySelectorAll(".popup").forEach((e) => {
      e.style.display = "none";
    });
    popup_is_show = false;
    popup_show = null;
    document.querySelector("body").removeEventListener("click", hind_popup);
  }

  document.querySelectorAll(".menubar-item").forEach((ele) => {
    var menu = ele.querySelector(".menubar-menu");

    if (!menu) return;

    menu.addEventListener("mouseenter", () => {
      if (!popup_is_show) return;

      var e = ele.querySelector(".popup");

      // nếu nó enter vào cái không có popup thì không làm gì hết
      if (!e) return;

      if (popup_show) {
        popup_show.style.display = "none";
      }

      popup_show = e;
      e.style.display = "block";
    });

    menu.addEventListener("click", (event) => {
      e = ele.querySelector(".popup");

      // nếu nó không có popup thì không làm gì cả
      if (!e) return;

      // nếu nhân vào cái đã hiện thị rồi hì ẩn
      if (popup_show == e) {
        hind_popup();
        return;
      }
      popup_show = e;
      popup_show.style.display = "block";
      popup_is_show = true;

      document.querySelector("body").addEventListener("click", hind_popup);
      event.stopPropagation();
    });
  });
}
menuInit();

// khi người dùng nhấn vào nút thu nhỏ phóng to side bar
function sliveBarInit() {
  const sidebar = document.getElementById("siderbar");
  document.querySelector(".menubar-icon").onclick = () => {
    if (sidebar.classList.contains("close")) {
      sidebar.classList.remove("close");
      document.getElementById("add-button").classList.remove("close");
    } else {
      document.getElementById("add-button").classList.add("close");
      sidebar.classList.add("close");
    }
  };
}
sliveBarInit();

function hocPhanInit(cls) {
  function hocphanpopup(e) {
    var parent = e.parentElement;
    parent.querySelector(".list-hp").classList.toggle("close");
    e.querySelector("i").classList.toggle("close");
  }

  function removeSelection(div_list_hp) {
    div_list_hp.querySelectorAll(".list-hp-item").forEach((e) => {
      if (e.classList.contains("select")) {
        e.classList.remove("select");
        tkb.remove(e.getAttribute("id-to-hoc"));
      }
    });
  }

  function chonTiet(hp, div_hp_item, div_list_hp, hp_per) {
    var list_tiet_curr = [];

    if (div_hp_item.classList.contains("select")) return;

    // tiet hoc pham moi them vao
    hp.tkb.forEach((tkb_item) => {
      for (let index = tkb_item.tbd; index <= tkb_item.tkt; index++) {
        list_tiet_curr.push(`${tkb_item.thu}-${index}`);
      }
    });

    var biTrung = false;
    var biKhacSC = false;
    Object.values(tkb.hocphan).forEach((hp_ed) => {
      // nếu mà mã học phần giống nhau thì nghi đè
      if (hp_ed.ma_mon == hp_per.ma_mon) return;

      // xo xanh neu co bat cu tiet nao co trong tiet hoc pham moi la bij trung
      hp_ed.tkb.forEach((tkb_item) => {
        for (let index = tkb_item.tbd; index <= tkb_item.tkt; index++) {
          if (list_tiet_curr.includes(`${tkb_item.thu}-${index}`)) {
            biTrung = true;
          }
        }
      });

      // khac co so hay khong
      hp_ed.tkb.forEach((tkb_item) => {
        hp.tkb.forEach((tkb_item1) => {
          if (
            tkb_item.thu == tkb_item1.thu &&
            tkb_item.phong[0] != tkb_item1.phong[0]
          ) {
            if (tkb_item.tkt <= 5 && tkb_item1.tkt <= 5) biTrung = true;
            else if (tkb_item.tkt > 5 && tkb_item1.tkt > 5) biKhacSC = true;
          }
        });
      });
    });

    console.log(list_tiet_curr);

    if (biTrung) {
      // bị trùng tiết
      createPopup("err", "Trùng tiết");
      return;
    }

    if (biKhacSC) {
      createPopup("err", "Khác cơ sở");
      return;
    }

    tkb.remove_go(hp.id_to_hoc);

    removeSelection(div_list_hp);
    isSave = false;
    console.log("set false");

    tkb.render(hp);
    sendEventChangeTH(hp.id_to_hoc);

    div_hp_item.classList.add("select");
  }

  function showGhost(hp, mahp) {
    if (!tkb.hocphan[hp.id_to_hoc])
      Object.values(tkb.hocphan).forEach((e) => {
        if (e.ma_mon == mahp) {
          tkb.remove(e.id_to_hoc, false);
        }
      });
    tkb.render_go(hp);
  }

  function hideGhost(hp, mahp) {
    tkb.remove_go(hp.id_to_hoc);
    Object.values(tkb.hocphan).forEach((e) => {
      if (e.ma_mon != mahp) {
        tkb.render(e);
      }
    });
  }

  var list_hp = [];

  function makeEle(mahp) {
    if (list_hp.includes(mahp)) return;
    list_hp.push(mahp);
    sendEventAddHp(mahp);

    var list = data.ds_nhom_to.filter((e) => e.ma_mon == mahp);
    var name = data.ds_mon_hoc[mahp];
    // filterItem.hp.add(mahp)
    var ct = list[0].so_tc;

    var div_hp = document.createElement("div");
    div_hp.className = "hp";
    div_hp.setAttribute("mahp", mahp);

    var div_info = document.createElement("div");
    div_info.className = "info";
    div_info.innerHTML = `
            <span class="name">${name}</span>
            <span class="ct">${ct}ct</span>
        `;
    // <i class='bx bx-chevron-down close'></i>

    var icon = document.createElement("i");
    icon.className = "bx bx-chevron-down close";

    var dele_id = null;
    var candele = false;
    icon.addEventListener("mouseenter", () => {
      dele_id = setTimeout(() => {
        icon.classList.remove("bx-chevron-down");
        icon.classList.add("bx-x");
        candele = true;
      }, 200);
    });

    icon.addEventListener("mouseleave", () => {
      clearTimeout(dele_id);
      icon.classList.add("bx-chevron-down");
      icon.classList.remove("bx-x");
      candele = false;
    });

    icon.addEventListener("click", () => {
      if (candele) {
        removeHp(mahp);
      }
    });

    div_info.appendChild(icon);

    var div_list_hp = document.createElement("div");
    div_list_hp.className = "list-hp close";

    // filterItem[mahp] = []
    filterItem[mahp] = new Set();
    list.forEach((hp) => {
      var div_hp_item = document.createElement("div");
      div_hp_item.className = "list-hp-item";

      div_hp_item.setAttribute("id-to-hoc", hp.id_to_hoc);

      div_hp_item.onmouseenter = () => {
        showGhost(hp, mahp);
      };
      div_hp_item.onmouseleave = () => {
        hideGhost(hp, mahp);
      };
      div_hp_item.onclick = () => {
        chonTiet(hp, div_hp_item, div_list_hp, hp);
      };

      div_hp_item.addEventListener("contextmenu", (event) => {
        console.log("ok");
        event.preventDefault();
      });

      hp.tkb.forEach((e) => {
        filterItem[mahp].add(e.gv);
      });

      var dsThu = [
        ...new Set(hp.tkb.map((e) => "T" + e.thu + " - P:" + e.phong)),
      ];
      var dsGv = [
        ...new Set(
          hp.tkb.map((e) => `<p> - ${e.gv} ${e.th ? "(TH)" : ""}</p>`)
        ),
      ];

      div_hp_item.innerHTML = `
                <p>${dsThu.join(" | ")}</p>
                <p>GV:  </p>
                ${dsGv.join("\n")}
                <p>20/40</p>
            `;

      div_list_hp.appendChild(div_hp_item);
    });

    div_info.onclick = () => {
      hocphanpopup(div_info);
    };
    div_list_hp.onmouseenter = () => {
      // tkb.hide_all()

      Object.values(tkb.hocphan).forEach((e) => {
        if (e.ma_mon == mahp) {
          tkb.remove(e.id_to_hoc, false);
        }
      });
    };

    div_list_hp.onmouseleave = () => {
      tkb.show_all();
    };

    div_hp.appendChild(div_info);
    div_hp.appendChild(div_list_hp);

    document.querySelector(".siderbar-body .ls").appendChild(div_hp);
  }

  function removeHp(mahp) {
    // filterItem.hp.delete(mahp)
    delete filterItem[mahp];
    var hp = document.querySelector(`.hp[mahp="${mahp}"]`);

    if (!hp) return;
    hp.remove();
    sendEventRemoveHp(mahp);

    Object.values(tkb.hocphan).forEach((e) => {
      if (e.ma_mon == mahp) {
        tkb.remove(e.id_to_hoc);
      }
    });
  }

  cls.removeHp = removeHp;

  cls.addHp = makeEle;
}

/**
 * tkb user to render table 'thời khóa biểu' when user click on 'hocphan' button
 */

// TODO chia ra làm 2 cái một cái là suer lý dữ liệu một cái là render không gộp chung
const tkb = {
  tkb: document.getElementById("tkb"),
  hocphan: {},
  hocphan_go: {},

  /**
   * clear all the hocphan in table tkb
   */
  clear: function () {
    Object.keys(this.hocphan).forEach((e) => {
      this.remove(e);
    });
  },
  /**
   * render hocphan in table tkb
   * @param {*} data hocphan information and in hocphan data haved tkb to render
   */
  render: function (data) {
    this.hocphan[data.id_to_hoc] = data;
    data.tkb.forEach((e) => {
      var { thu, tbd, tkt, th, phong, gv } = e;
      var tiets = this.tkb.querySelectorAll(".tiet");
      for (let index = tbd; index <= tkt - 1; index++) {
        var thus = tiets[index].querySelectorAll("td");
        thus[thu - 1].style.display = "none";
      }

      var tbd_ele = tiets[tbd - 1].querySelectorAll("td")[thu - 1];
      tbd_ele.rowSpan = `${tkt - tbd + 1}`;
      tbd_ele.querySelector(".tiet-item").classList.add("haveitem");
      if (th) tbd_ele.querySelector(".tiet-item").classList.add("th");

      tbd_ele.querySelector(".tiet-item").innerHTML = `
                <span>${data.ten_mon} (${data.ma_mon})</span>
                <p>
                    <span>Phòng: </span>
                    ${phong}
                </p>
                <p>
                    <span>GV: </span>
                    ${gv}
                </p>
            `;
    });
  },
  /**
   * remove hocphan in table tkb
   * @param {*} id The id of the hoc phan
   * @param {boolean} deleted if false is chunk hidden element
   */
  remove: function (id, deleted = true) {
    var data = this.hocphan[id];

    if (!data) return;

    data.tkb.forEach((e) => {
      var { thu, tbd, tkt, th } = e;
      var tiets = this.tkb.querySelectorAll(".tiet");
      for (let index = tbd; index <= tkt - 1; index++) {
        var thus = tiets[index].querySelectorAll("td");
        thus[thu - 1].style.display = "";
      }

      var tbd_ele = tiets[tbd - 1].querySelectorAll("td")[thu - 1];
      tbd_ele.rowSpan = `1`;
      tbd_ele.querySelector(".tiet-item").classList.remove("haveitem");
      if (th) tbd_ele.querySelector(".tiet-item").classList.remove("th");
      tbd_ele.querySelector(".tiet-item").innerHTML = "";
    });
    if (deleted) delete this.hocphan[id];
  },
  /**
   * look like a render function a distinct from render function are is not add to list 'hocphan' and ez to remove
   * @param {*} data
   */
  render_go: function (data) {
    this.hocphan_go[data.id_to_hoc] = data;
    data.tkb.forEach((e) => {
      var { thu, tbd, tkt, th, phong, gv } = e;
      var tiets = this.tkb.querySelectorAll(".tiet");
      for (let index = tbd; index <= tkt - 1; index++) {
        var thus = tiets[index].querySelectorAll("td");
        thus[thu - 1].style.display = "none";
      }

      var tbd_ele = tiets[tbd - 1].querySelectorAll("td")[thu - 1];
      tbd_ele.rowSpan = `${tkt - tbd + 1}`;
      tbd_ele.querySelector(".tiet-item").classList.add("haveitem");
      if (th) tbd_ele.querySelector(".tiet-item").classList.add("th");
      else tbd_ele.querySelector(".tiet-item").classList.remove("th");

      tbd_ele.querySelector(".tiet-item").classList.add("ghost");
      tbd_ele.querySelector(".tiet-item").innerHTML = `
                <span>${data.ten_mon} (${data.ma_mon})</span>
                <p>
                    <span>Phòng: </span>
                    ${phong}
                </p>
                <p>
                    <span>Phòng: </span>
                    ${gv}
                </p>
            `;
    });
  },
  /**
   * remove the render_go
   * @param {*} ten
   */
  remove_go: function (ten) {
    var data = this.hocphan_go[ten];

    if (!data) return;

    data.tkb.forEach((e) => {
      var { thu, tbd, tkt, th } = e;
      var tiets = this.tkb.querySelectorAll(".tiet");
      for (let index = tbd; index <= tkt - 1; index++) {
        var thus = tiets[index].querySelectorAll("td");
        thus[thu - 1].style.display = "";
      }

      var tbd_ele = tiets[tbd - 1].querySelectorAll("td")[thu - 1];
      tbd_ele.rowSpan = `1`;
      tbd_ele.querySelector(".tiet-item").classList.remove("haveitem");
      if (th) tbd_ele.querySelector(".tiet-item").classList.remove("th");

      tbd_ele.querySelector(".tiet-item").classList.remove("ghost");
      tbd_ele.querySelector(".tiet-item").innerHTML = "";
    });
    delete this.hocphan_go[ten];
  },

  /**
   * hide all 'hocphan' in table tkb
   */
  hide_all: function () {
    Object.keys(this.hocphan).forEach((e) => {
      this.remove(e, false);
      console.log(e);
    });
  },
  /**
   * show all 'hocphan' is hidden
   */
  show_all: function () {
    Object.values(this.hocphan).forEach((e) => {
      this.render(e);
    });
  },
};

// khai báo hàm addHp
// gọi hàm addHp với parameter là mã học phần
// thì nó sẽ thêm vời side bar học phần đó
hocPhanInit(this);

function get_dshocphan() {
  var load_popup = createPopup("info", "get data", -1);
  fetch(urlApis.getDshocphan)
    .then((e) => e.json())
    .then((e) => {
      data = e;
      load_popup.remove();
      initFile();
    });
}

get_dshocphan();

function makeSavePopup(img_url, oncancel, onok) {
  var Node1 = document.createElement("div");
  Node1.setAttribute("class", "popup-item save-tkb");

  var Node11 = document.createElement("div");
  Node11.setAttribute("class", "wall");
  Node1.appendChild(Node11);

  var Node111 = document.createElement("div");
  Node111.setAttribute("class", "top");
  Node11.appendChild(Node111);

  var Node1111 = document.createElement("span");
  Node111.appendChild(Node1111);

  var textNode1111_1 = document.createTextNode("Save");
  Node1111.appendChild(textNode1111_1);

  var Node1112 = document.createElement("span");
  Node1112.onclick = oncancel;
  Node111.appendChild(Node1112);

  var Node11121 = document.createElement("i");
  Node11121.setAttribute("class", "bx bx-x");
  Node1112.appendChild(Node11121);

  var Node112 = document.createElement("div");
  Node112.setAttribute("class", "conten");
  Node11.appendChild(Node112);

  var Node1121 = document.createElement("div");
  Node1121.setAttribute("class", "fill");
  Node112.appendChild(Node1121);

  var Node11211 = document.createElement("div");
  Node11211.setAttribute("class", "input-text tkb-name");
  Node1121.appendChild(Node11211);

  var Node112111 = document.createElement("input");
  Node112111.setAttribute("type", "text");
  Node112111.setAttribute("placeholder", "TKB name");
  Node112111.setAttribute("id", "file_save_name");
  Node11211.appendChild(Node112111);

  var Node11212 = document.createElement("div");
  Node11212.setAttribute("class", "input-text description");
  Node1121.appendChild(Node11212);

  var Node112121 = document.createElement("input");
  Node112121.setAttribute("type", "text");
  Node112121.setAttribute("placeholder", "Description (optional)");
  Node112121.setAttribute("id", "file_save_des");
  Node11212.appendChild(Node112121);

  var Node11213 = document.createElement("label");
  Node11213.setAttribute("class", "type public");
  Node1121.appendChild(Node11213);

  var Node112131 = document.createElement("input");
  Node112131.setAttribute("type", "radio");
  Node112131.setAttribute("id", "public-type");
  Node112131.setAttribute("name", "tkb-type");
  Node11213.appendChild(Node112131);

  var Node112132 = document.createElement("i");
  Node112132.setAttribute("class", "bx bxs-book-alt");
  Node11213.appendChild(Node112132);

  var Node112133 = document.createElement("div");
  Node112133.setAttribute("class", "text");
  Node11213.appendChild(Node112133);

  var Node1121331 = document.createElement("p");
  Node112133.appendChild(Node1121331);

  var textNode1121331_1 = document.createTextNode("Công khai:");
  Node1121331.appendChild(textNode1121331_1);

  var Node1121332 = document.createElement("p");
  Node112133.appendChild(Node1121332);

  var textNode1121332_1 = document.createTextNode(
    "Mọi người có thể thấy và chỉnh sửa thời khóa biểu của bạn."
  );
  Node1121332.appendChild(textNode1121332_1);

  var Node11214 = document.createElement("label");
  Node11214.setAttribute("class", "type private");
  Node1121.appendChild(Node11214);

  var Node112141 = document.createElement("input");
  Node112141.setAttribute("type", "radio");
  Node112141.setAttribute("id", "private-type");
  Node112141.setAttribute("name", "tkb-type");
  Node112141.setAttribute("checked", true);
  Node11214.appendChild(Node112141);

  var Node112142 = document.createElement("i");
  Node112142.setAttribute("class", "bx bxs-lock-alt");
  Node11214.appendChild(Node112142);

  var Node112143 = document.createElement("div");
  Node112143.setAttribute("class", "text");
  Node11214.appendChild(Node112143);

  var Node1121431 = document.createElement("p");
  Node112143.appendChild(Node1121431);

  var textNode1121431_1 = document.createTextNode("Private:");
  Node1121431.appendChild(textNode1121431_1);

  var Node1121432 = document.createElement("p");
  Node112143.appendChild(Node1121432);

  var textNode1121432_1 = document.createTextNode(
    "Mọi người có thể thấy và chỉnh sửa thời khóa biểu của bạn."
  );
  Node1121432.appendChild(textNode1121432_1);

  var Node1122 = document.createElement("div");
  Node1122.setAttribute("class", "thumbnail");
  Node112.appendChild(Node1122);

  var Node11221 = document.createElement("img");
  Node11221.setAttribute("src", img_url);
  Node1122.appendChild(Node11221);

  var Node113 = document.createElement("div");
  Node113.setAttribute("class", "bottom");
  Node11.appendChild(Node113);

  var Node1131 = document.createElement("button");
  Node1131.setAttribute("class", "cancel");
  Node1131.onclick = oncancel;
  Node113.appendChild(Node1131);

  var textNode1131_1 = document.createTextNode("cancel");
  Node1131.appendChild(textNode1131_1);

  var Node1132 = document.createElement("button");
  Node1132.setAttribute("class", "ok");
  Node1132.onclick = onok;
  Node113.appendChild(Node1132);

  var textNode1132_1 = document.createTextNode("save");
  Node1132.appendChild(textNode1132_1);
  return Node1;
}

function makeInvitePopup(link, onCancel, onOk) {
  //to append the html to an element simply write:
  //appendHTMLto(document.getElementById("parent"));
  //Create Elements
  var Node1 = document.createElement("div");
  Node1.setAttribute("class", "popup-item invite-link");

  var Node11 = document.createElement("div");
  Node11.setAttribute("class", "wall");
  Node1.appendChild(Node11);

  var Node111 = document.createElement("div");
  Node111.setAttribute("class", "top");
  Node11.appendChild(Node111);

  var Node1111 = document.createElement("span");
  Node111.appendChild(Node1111);

  var textNode1111_1 = document.createTextNode("Invite link");
  Node1111.appendChild(textNode1111_1);

  var Node1112 = document.createElement("span");
  Node1112.onclick = onCancel;
  Node111.appendChild(Node1112);

  var Node11121 = document.createElement("i");
  Node11121.setAttribute("class", "bx bx-x");
  Node1112.appendChild(Node11121);

  var Node112 = document.createElement("div");
  Node112.setAttribute("class", "conten");
  Node11.appendChild(Node112);

  var w = document.createTextNode(
    "Lưu ý mỗi link chỉ sử dụng được một lần và không có nhiều link đồng thời"
  );
  Node112.appendChild(w);

  var Node1121 = document.createElement("div");
  Node1121.setAttribute("class", "wall-link");
  Node112.appendChild(Node1121);

  var Node11211 = document.createElement("input");
  Node11211.setAttribute("type", "text");
  Node11211.setAttribute("onkeydown", "event.preventDefault()");
  Node11211.setAttribute("onclick", "event.target.select()");
  Node11211.setAttribute("value", link);
  Node1121.appendChild(Node11211);

  var Node113 = document.createElement("div");
  Node113.setAttribute("class", "bottom");
  Node11.appendChild(Node113);

  var Node1131 = document.createElement("button");
  Node1131.setAttribute("class", "cancel");
  Node1131.onclick = onCancel;
  Node113.appendChild(Node1131);

  var textNode1131_1 = document.createTextNode("cancel");
  Node1131.appendChild(textNode1131_1);

  var Node1132 = document.createElement("button");
  Node1132.setAttribute("class", "ok");
  Node1132.onclick = onOk;
  Node113.appendChild(Node1132);

  var textNode1132_1 = document.createTextNode("copy");
  Node1132.appendChild(textNode1132_1);

  return Node1;
}

function onclickInviteLink() {
  var popup;
  var link;

  function onCancel() {
    popup.remove();
  }

  function onOk() {
    navigator.clipboard.writeText(link);
    createPopup("success", "copy thành công");
  }

  if (!tkb_id) {
    createPopup("err", "TKB chưa lưu");
    return;
  }

  fetch(
    `${urlApis.getInviteLink}?` +
      new URLSearchParams({
        tkb_id: tkb_id,
      })
  ).then(async (resp) => {
    const json_data = await resp.json();

    if (json_data.err) {
      createPopup("err", json_data.err_mess);
      return;
    }
    link = location.origin + "/tkb/invite?id=" + json_data.data;
    popup = makeInvitePopup(link, onCancel, onOk);
    document.getElementById("popup-area").appendChild(popup);
  });
}

function saveTkb() {
  var base64;
  var popup;
  function cancelHandle() {
    popup.remove();
  }

  function saveHandle() {
    // console.log(ele)
    var name = popup.querySelector("#file_save_name").value;
    var des = popup.querySelector("#file_save_des").value;

    console.log(name, des);

    fetch(urlApis.createTkb, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: des,
        id_to_hocs: Object.keys(tkb.hocphan),
        thumbnail: base64.substring(23),
      }),
    }).then(async (e) => {
      var resp_json = await e.json();
      if (resp_json.err) {
        createPopup("err", resp_json.err_mess);
        return;
      }
      let stateObj = { id: "200" };
      tkb_id = resp_json.data.tkb_id;
      window.history.pushState(stateObj, "", "/tkb/" + tkb_id);
      createPopup("success", "");
      isSave = true;
      console.log("set true");
      sessionStorage.setItem("tkb-save", "");
      cancelHandle();
    });
  }

  if (!checkLogin()) {
    createPopup("err", "Bạn chưa có đăng nhập", 2000);
    return;
  }

  if (tkb_id) {
    fetch(
      `${urlApis.getTkb}?` +
        new URLSearchParams({
          tkb_id: tkb_id,
        }),
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_to_hocs: Object.keys(tkb.hocphan),
        }),
      }
    ).then(async (e) => {
      var resp_json = await e.json();
      if (resp_json.err_mess) {
        createPopup("err", resp_json.err_mess);
      }

      createPopup("success", "");
      isSave = true;
    });
  } else {
    html2canvas(document.querySelector("body > div.main-body > div.tkb"), {
      windowWidth: 1300,
      windowHeight: 616,
    }).then((e) => {
      console.log(e);
      base64 = e.toDataURL("image/jpeg");

      var ele = document.getElementById("popup-area");

      popup = makeSavePopup(base64, cancelHandle, saveHandle);
      ele.appendChild(popup);
    });
    console.log(Object.keys(tkb.hocphan));
  }
}

function createPopup(type, mess, duration = 2000) {
  function createElem() {
    var node_1 = document.createElement("DIV");
    node_1.setAttribute("class", `item-notification ${type}`);

    var node_2 = document.createElement("SPAN");
    node_2.setAttribute("class", "icon body");
    node_1.appendChild(node_2);

    var node_3 = document.createElement("I");
    if (type == "err") {
      node_3.setAttribute("class", "bx bx-x-circle");
    } else if (type == "warning") {
      node_3.setAttribute("class", "bx bx-info-circle");
    } else node_3.setAttribute("class", "bx bx-check-circle");

    node_2.appendChild(node_3);

    var node_4 = document.createElement("SPAN");
    node_4.textContent = type.toUpperCase() + ":";
    node_2.appendChild(node_4);

    var node_5 = document.createElement("SPAN");
    node_5.textContent = mess;
    node_2.appendChild(node_5);

    var node_6 = document.createElement("SAMP");
    node_6.setAttribute("class", "close");
    node_6.addEventListener("click", function () {
      node_1.remove();
    });
    node_1.appendChild(node_6);

    var node_7 = document.createElement("I");
    node_7.setAttribute("class", "bx bx-x");
    node_6.appendChild(node_7);

    return node_1;
  }

  var node_1 = createElem();
  document.getElementById("notification").appendChild(node_1);
  if (duration > 0) {
    setTimeout(() => {
      node_1.remove();
    }, duration);
  }
  return node_1;
}

function filterInit() {
  const popup_ = document.querySelector(".popup-filter");
  var filter_stor = {
    thu: [],
    tiet: [],
    hp: new Set(),
    gv: new Set(),
  };

  function hide_filter() {
    popup_.classList.remove("show");
    document.body.removeEventListener("click", hide_filter);
  }

  function filterRenderHP() {
    var a = document.querySelector("div.filter-item.hocphan > div.items > div");
    a.querySelectorAll("label");
    a.innerHTML = "";
    // TODO
    Object.keys(filterItem).forEach((mahp) => {
      // var mahp = e.getAttribute('mahp')

      var name = data.ds_mon_hoc[mahp];

      a.innerHTML += `<li mahp="${mahp}"><label><input ${
        filter_stor.hp.has(mahp) ? "" : "checked"
      } type="checkbox">${name}</label></li>`;
    });
  }

  function filterRenderGV() {
    var a = document.querySelector("div.filter-item.gv > div.items > div");
    a.innerHTML = "";

    Object.keys(filterItem).forEach((key) => {
      if (filter_stor.hp.has(key)) return;

      filterItem[key].forEach((e) => {
        a.innerHTML += `<li mahp="${key}"><label><input ${
          filter_stor.gv.has(e) ? "" : "checked"
        } type="checkbox">${e}</label></li>`;
      });
    });
    // filterItem.gv.forEach(e => {
    // })
  }

  function HandleFilterHP() {
    document
      .querySelectorAll("div.filter-item.hocphan > div.items li")
      .forEach((e) => {
        var a = e.getAttribute("mahp");
        if (e.querySelector("input").checked) {
          document.querySelector(`div.hp[mahp="${a}"]`).style.display = null;
          document
            .querySelectorAll(`.gv div.items > div > li[mahp="${a}"]`)
            .forEach((e) => (e.style.display = null));
          filter_stor.hp.delete(a);
          return;
        }
        filter_stor.hp.add(a);
        document.querySelector(`div.hp[mahp="${a}"]`).style.display = "none";
        document
          .querySelectorAll(`.gv div.items > div > li[mahp="${a}"]`)
          .forEach((e) => (e.style.display = "none"));
      });
  }

  function HandleFilterGv() {
    document
      .querySelectorAll("div.filter-item.gv > div.items li")
      .forEach((e) => {
        var gv = e.textContent;
        var check = e.querySelector("input").checked;
        if (!check) filter_stor.gv.add(gv);
        else filter_stor.gv.delete(gv);
        var list_gv = data.ds_nhom_to.filter((e) => {
          var have = false;

          e.tkb.forEach((j) => {
            if (j.gv == gv) have = true;
          });

          return have;
        });

        list_gv.forEach((e) => {
          var ele = document.querySelector(
            `div.list-hp div[id-to-hoc="${e.id_to_hoc}"]`
          );
          if (ele) {
            if (check) {
              ele.style.display = null;
            } else {
              ele.style.display = "none";
            }
          }
        });
      });
  }

  document.querySelector(
    "#siderbar > div.info-filter > span.button-filter-wall > div > div.top > div.right"
  ).onclick = hide_filter;
  popup_.addEventListener("click", (event) => {
    HandleFilterHP();
    HandleFilterGv();
    event.stopPropagation();
  });

  document.querySelector(".button-filter").onclick = (event) => {
    if (popup_.classList.contains("show")) {
      hide_filter();
    } else {
      popup_.classList.add("show");
      filterRenderHP();
      filterRenderGV();
      document.body.addEventListener("click", hide_filter);
      event.stopPropagation();
    }
  };
}
filterInit();

const beforeUnloadHandler = (event) => {
  console.log(event);
  if (isSave) return;

  // Recommended
  event.preventDefault();

  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = true;
};

window.addEventListener("beforeunload", beforeUnloadHandler);

function beforNavigationPage() {
  isSave = true;
  console.log("set true");
  sessionStorage.setItem(
    "tkb-save",
    JSON.stringify(Object.values(tkb.hocphan))
  );
}

function loadHocPhanFromSessionStorage() {
  var hocphan = sessionStorage.getItem("tkb-save");

  sessionStorage.setItem("tkb-save", "");
  if (!hocphan) return;

  hocphan = JSON.parse(hocphan);

  hocphan.forEach((e) => {
    console.log(e);
    addHp(e.ma_mon);
    var ele = document.querySelector(
      `div.list-hp div[id-to-hoc="${e.id_to_hoc}"]`
    );
    ele.click();
  });
}

function sendEventAddHp(hp) {
  if (!tkb_id) return;
  socket.emit("add-hp", hp);
}

function sendEventRemoveHp(hp) {
  if (!tkb_id) return;
  socket.emit("remove-hp", hp);
}

function sendEventChangeTH(id_to_hoc) {
  console.log("sendEventChangeTH");
  if (!tkb_id) return;
  socket.emit("change-th", id_to_hoc);
}

socket.on("add-hp", (mahp) => {
  console.log("add-hp", mahp);
  addHp(mahp);
});

socket.on("remove-hp", (mahp) => {
  console.log(mahp);
  removeHp(mahp);
});

socket.on("change-th", (id_to_hoc) => {
  console.log(id_to_hoc);
  var ele = document.querySelector(`div.list-hp div[id-to-hoc="${id_to_hoc}"]`);
  if (ele) ele.click();
});

function exportJavascript() {
  var data = `var token=JSON.parse(sessionStorage.getItem("CURRENT_USER")).access_token,SV_Nganh=this.SV_Nganh;function sendReq(e){fetch("/api/dkmh/w-xulydkmhsinhvien",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+token},body:JSON.stringify({filter:{id_to_hoc:e,is_checked:!0,sv_nganh:SV_Nganh}})})}
     
     ${JSON.stringify(Object.keys(tkb.hocphan))}.forEach(e => {
         sendReq(e)
     })
     `;
  navigator.clipboard.writeText(data).then(() => {
    createPopup("success", "copy to clipboard");
  });
}
