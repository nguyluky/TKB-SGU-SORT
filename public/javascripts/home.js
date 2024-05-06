
fetch(urlApis.getTkbs).then(e => e.json()).then(e => {
    Object.values(e.data).forEach(e => {
        var base64String = String.fromCharCode(...new Uint8Array(e.thumbnails.data))
        var tkb_name = e.tkb_name

        document.getElementById('saved').appendChild(create_list_item(tkb_name, base64String, e.date_save , e.id))

    })
})

function create_list_item(tkb_name, base64String, date_save, id){
	//Create Elements
	var div_listtiem_1 = document.createElement("div");
	var div_thumbnail_1_1 = document.createElement("div");
	var img__1_1_1 = document.createElement("img");
	var div_info_1_2 = document.createElement("div");
	var p_name_1_2_1 = document.createElement("p");
	var p_auth_1_2_2 = document.createElement("p");
	var div_more_1_3 = document.createElement("div");
	var i_bx_bxdotsvertical_1_3_1 = document.createElement("i");
	//Create Text Nodes
	var textNode_1_2_1_1 = document.createTextNode(tkb_name);
	var textNode_1_2_2_1 = document.createTextNode(dataFormatString(date_save));
	//Set Attributes
	img__1_1_1.setAttribute("src","data:image/jpeg;base64," + base64String);
	div_listtiem_1.setAttribute("class","list-tiem");
	div_thumbnail_1_1.setAttribute("class","thumbnail");
	img__1_1_1.setAttribute("alt","");
	div_info_1_2.setAttribute("class","info");
	p_name_1_2_1.setAttribute("class","name");
	p_auth_1_2_2.setAttribute("class","auth");
	div_more_1_3.setAttribute("class","more");
	i_bx_bxdotsvertical_1_3_1.setAttribute("class","bx bx-dots-vertical");
	//Append Children
	div_listtiem_1.appendChild(div_thumbnail_1_1);
	div_thumbnail_1_1.appendChild(img__1_1_1);
	div_listtiem_1.appendChild(div_info_1_2);
	div_info_1_2.appendChild(p_name_1_2_1);
	p_name_1_2_1.appendChild(textNode_1_2_1_1);
	div_info_1_2.appendChild(p_auth_1_2_2);
	p_auth_1_2_2.appendChild(textNode_1_2_2_1);
	div_listtiem_1.appendChild(div_more_1_3);
	div_more_1_3.appendChild(i_bx_bxdotsvertical_1_3_1);


	div_listtiem_1.onclick = () => {
		document.location.pathname = '/tkb/' + id;
	}

    return div_listtiem_1
}

function newTkb() {
	document.location.pathname = '/tkb'
}