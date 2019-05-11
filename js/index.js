let modeCopy = $('#mode'), attribCopy = $('#attrib'), pass  = $('#pass'), head  = $('#head');
let mode_copy, attrib_copy;

// ---------------------------------------------------------------------------------------------
// Literasi Notifikasi dan Response
const notify = {
  set : (cf) => {
    const not   = doc.createElement('div'),
          txAl  = doc.createTextNode(cf.textNode);
    let bgColor;
    if (cf.background == true) { bgColor = "#26bf0b" } else { bgColor = "#ff3338"};

    not.setAttribute('class', 'notify');
    not.appendChild(txAl);
    not.style.cssText = "background:"+bgColor+";position: fixed; z-index:55; top: 45%; left: 45%; widht: 150px; border: 1px #ddd solid; color: #eee; margin: 0; padding: 5px;"
    doc.body.prepend(not);

    setTimeout(() => {
      notify.del();
    }, 1500); 
  },

  del : () => {
    const len = $$('.notify');
    for (let i = 0; i < len.length; i++) {
      len[i].remove();
    }
  },

  promise : (cf) => {
    new Promise( (solved, reject) => {
      if (cf.cop == true) {
        solved('Copy ' + cf.target + ' Success!');
      }
      else {
        reject('Copy ' + cf.target + ' Gagal!')
      }
    }).then((msg) => {
      notify.set({background: true, textNode: msg}); 
    }).catch((msg) => {
      notify.set({background: false, textNode: msg});
    });  
  }
}

// ---------------------------------------------------------------------------------------------
// Mengambil Config JSON
const config    = 'config.json';
const getConfig = {
  get : () => {
    fetch(config).then((res) => res.json())
    .then((data) => {
      // passing set data to setting

      getConfig.set(data);
      notify.set({background: true, textNode: "Load Config Success"});

    })
    .catch((er) => {
      notify.set({background: false, textNode: "ERROR: " + er});
    });
  },

  cok : () => {
    // =================================
    // Cek Cookie Config
    if (doc.cookie.length != 0) {
      let semuaCookie = doc.cookie.split(';');
      for (let i = 0; i < semuaCookie.length; i++) {
        let cok = semuaCookie[i].split('=');
        cokSs = cok[0].replace(' ', '');

        if (cokSs == "cok_modeCopy") {
          mode_copy = cok[1];

          // set autoSelected on query select
          let mod = $$('#mode option');
          for (let x = 0; x < mod.length; x++) {
            if (mod[x].getAttribute('setCok') == cok[1]) {
              mod[x].setAttribute('selected','');
            }
          }
        }
        else if (cokSs == "cok_attribCopy") {
          attrib_copy = cok[1];

          // set autoSelected on query select
          let atb = $$('#attrib option');
          for (let s = 0; s < atb.length; s++) {
            if (atb[s].getAttribute('setCok') == cok[1]) {
              atb[s].setAttribute('selected','');
            }
          }
        }
      }
      //---------------------------------------------
      // cek jika cookie tidak berhasil set
      if (attrib_copy == undefined || mode_copy == undefined) {
        getConfig.get();
      }
    }else{
      getConfig.get();
    }
  },

  set : (cf) => {
    const setting = cf.setting;

    //set setting config from json
    mode_copy   = setting.mode_copy;
    attrib_copy = setting.attrib_copy;
  },

  save : (cf) => {
    doc.cookie = "cok_modeCopy=" + cf.mode_copy + "; max-age=3600";
    doc.cookie = "cok_attribCopy=" + cf.attrib_copy + "; max-age=3600";
    
    notify.set({background: true, textNode: "Config Saved"});
    getConfig.cok();
  }
}

window.onload = () => {
  getConfig.cok();
}

// ---------------------------------------------------------------------------------------------
// Functin Setting Configuration
function setting() {
  const frameSetting = $('#collapse_jc');
  frameSetting.classList.toggle('show');
}

// ---------------------------------------------------------------------------------------------
// Functin Setting Configuration
function restore() {
  for (let i = 0; i < 100; i++){
    let semuaCookie = doc.cookie.split('=');
    doc.cookie = semuaCookie[0] + "=;expires=Thu, 01 Jan 1960 00:00:00 UTC;";
  }
  // set autoSelected on query select
  let resAtb = $$('#attrib option');
  for (let s = 0; s < resAtb.length; s++) {
    if (resAtb[s].value == "") {
      resAtb[s].setAttribute('selected','');
    }
  }

  // set autoSelected on query select
  let resMod = $$('#mode option');
  for (let s = 0; s < resMod.length; s++) {
    if (resMod[s].value == "") {
      resMod[s].setAttribute('selected','');
    }
  }
  getConfig.get();
}

// ---------------------------------------------------------------------------------------------
// Functin Save Cookie Configuration
function simpan() {
  if (modeCopy.value == "") {
    notify.set({background: false, textNode: "Mode Copy Belum dipilih"});
    return false;
  }
  else if (attribCopy.value == "") {
    notify.set({background: false, textNode: "Attribute Set Belum dipilih"});
    return false;
  }
  else if (modeCopy.value != "" && attribCopy.value != "") {
      getConfig.save({mode_copy: modeCopy.value, attrib_copy: attribCopy.value});
  }
  
}

// ---------------------------------------------------------------------------------------------
// Functin Exp onclick button
function get(el) {

  if (mode_copy == undefined || mode_copy == "") {
    notify.set({background: false, textNode: "Mode Copy Belum disetting"});
    return false;
  }

  if (attrib_copy == undefined || attrib_copy == "") {
    notify.set({background: false, textNode: "Attribute Set Belum disetting"});
    return false;
  }

  //----------------------------------------------------
  else if (mode_copy == "clas") {
    const slcCls = el.children[1];

    let val_cpMod;
    if (attrib_copy == "tag") {
      val_cpMod = '<i class="' + slcCls.innerHTML + '"></i>';
    }
    else if (attrib_copy == "text") {
      val_cpMod = slcCls.innerHTML;
    }
    
    pass.value  = val_cpMod;
    pass.select()
    const cop   = doc.execCommand('copy');
    notify.promise({cop: cop, target: slcCls.innerHTML});
  }

  //----------------------------------------------------
  else if (mode_copy == "hexa"){
    const slcHex  = el.children[2].innerHTML;
    const slcs    = slcHex.replace('amp;', '');

    let val_cpMod;
    if (attrib_copy == "tag") {
      val_cpMod = '<i class="fas">' + slcs + '</i>';
    }
    else if (attrib_copy == "text") {
      val_cpMod = slcs;
    }
    
    pass.value  = val_cpMod;
    pass.select();
    const cop   = doc.execCommand('copy');
    notify.promise({cop: cop, target: slcs});
  }
}

// ---------------------------------------------------------------------------------------------
// Onscroll Header Fixed
window.onscroll = () => {
  if ( window.pageYOffset > head.offsetTop ) {
    head.classList.add('head_fix');
  }
  else if ( window.pageYOffset == 0 ) {
    head.classList.remove('head_fix');
  }
};
