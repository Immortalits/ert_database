i = 1
min = 3
max = 10

function createoption(op, value) {
  let op1 = document.createElement("option");
  op1.innerText = op;
  op1.value = value;
  return op1;
}

function createlabel(op) {
  let label = document.createElement("label");
  label.innerText = op;
  return label;
}

function eredmeny() {
  let sel = document.createElement("select");
  sel.name = "e" + i.toString();
  sel.required = true;
  let op1 = document.createElement("option");
  op1.innerText = "Kérjük válasszon!";
  op1.value = "";
  sel.appendChild(op1);
  sel.appendChild(createoption("Kiváló", "Kiváló"));
  sel.appendChild(createoption("Jó", "Jó"));
  sel.appendChild(createoption("Változó", "Változó"));
  sel.appendChild(createoption("Fejlesztendő", "Fejlesztendő"));
  sel.appendChild(createoption("Erősen fejlesztendő", "Erősen fejlesztendő"));
  sel.appendChild(createoption("Kritikus", "Kritikus"));
  return sel;
}

function tulajdonsag() {
  let tul = document.createElement("select");
  tul.name = "tul" + i.toString();
  tul.required = true;
  let op1 = document.createElement("option");
  op1.innerText = "Kérjük válasszon!"
  op1.value = "";
  tul.appendChild(op1);
  for (let e in kpi_kat) {
    tul.appendChild(createoption(kpi_kat[e].nev, kpi_kat[e].id));
  }
  return tul;
}

function deletebutton(id) {
  let del = document.createElement('img');
  del.src = "minus.png";
  del.alt = "Törlés";
  del.id = "minus" + (id).toString();
  del.className = "icon button";
  del.onclick = (f) => {
    document.getElementById(i - 1).remove();

    if (i > 5) {
      let del2 = deletebutton(i - 2);
      document.getElementById("minusdiv" + (i - 2)).appendChild(del2);
    }
    i--;
    if (i <= max) {
      document.getElementById("add").style.height = "auto";
    }
  };
  return del;
}

let mehet = true;
function ellenorzes(elemszam) {
  let db3 = 0;
  let db2 = 0;
  for (let e = 1; e < elemszam; e++) {
    let akt_elem = document.getElementById("p" + e.toString()).value;
    if (akt_elem == 3) {
      db3++;
    }
    else if (akt_elem == 2) {
      db2++;
    }
  }
  let szazalek3 = db3 / (elemszam - 1);
  let szazalek2 = db2 / (elemszam - 1);
  let errordivek = document.getElementsByClassName("errordiv");
  mehet = true;

  for (let e in errordivek) {
    errordivek[e].innerHTML = "";
  }
  if (szazalek3 > 0.25) {
    for (let e = 1; e < elemszam; e++) {
      if (document.getElementById("p" + e.toString()).value == 3) {
        document.getElementById("errordiv" + e.toString()).innerHTML = "Kérlek változtass a prioritáson!";
      }
    }
    mehet = false;
  }
  if (szazalek2 > 0.3) {
    for (let e = 1; e < elemszam; e++) {
      if (document.getElementById("p" + e.toString()).value == 2) {
        document.getElementById("errordiv" + e.toString()).innerHTML = "Kérlek változtass a prioritáson!";
      }
    }
    mehet = false;
  }
  document.getElementById("submithely").innerHTML = "";
  if (mehet) {
    let submit = document.createElement("input");
    submit.type = "submit";
    document.getElementById("submithely").appendChild(submit);
  }
}

ellenorzes(i);
function Hozzaad() {
  if (i <= max) {
    let container = document.createElement("div");
    container.className = "container_ert";
    container.id = i;
    container.appendChild(createlabel("Tulajdonság: "));
    container.appendChild(tulajdonsag());
    container.appendChild(createlabel("Prioritás: "));

    let prio = document.createElement("input");
    prio.required = true;
    prio.name = "p" + i.toString();
    prio.id = "p" + i.toString();
    prio.type = "number";
    prio.min = 1;
    prio.max = 3;
    prio.value = 1;

    prio.onchange = () => {
      ellenorzes(i);
    }

    container.appendChild(prio);
    container.appendChild(createlabel("Eredmény: "));
    container.appendChild(eredmeny());

    let minusdiv = document.createElement("div");
    minusdiv.id = "minusdiv" + i;

    let errordiv = document.createElement("div");
    errordiv.id = "errordiv" + i;
    errordiv.className = "errordiv";

    document.getElementById("ertekeles").appendChild(container);
    if (i > 3) {
      if (i > 4) {
        let volt = document.getElementById("minus" + (i - 1))
        volt.remove();
      }
      minusdiv.appendChild(deletebutton(i));
    }
    container.append(minusdiv);
    container.append(errordiv);

    if (i == max) {
      document.getElementById("add").style.height = 0;
    }
    i++;
  }
  else {
    document.getElementById("add").style.height = 0;
  }
  ellenorzes(i);
}

for (let e = 0; e < min; ++e) {
  Hozzaad();
}
