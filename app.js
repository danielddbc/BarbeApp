{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const API_URL = "{\field{\*\fldinst{HYPERLINK "https://script.google.com/macros/s/AKfycbzb0EVZHPOhnJJpComzwDlfk3HjkiwgKgjAu3KYnNgpLCwY72pz_EF6xJ4pQqGp0nqu-w/exec"}}{\fldrslt https://script.google.com/macros/s/AKfycbzb0EVZHPOhnJJpComzwDlfk3HjkiwgKgjAu3KYnNgpLCwY72pz_EF6xJ4pQqGp0nqu-w/exec}}";\
\
function register() \{\
  fetch(API_URL, \{\
    method: "POST",\
    body: JSON.stringify(\{\
      action: "register",\
      nome: document.getElementById("nome").value,\
      telefone: document.getElementById("telefone").value,\
      email: document.getElementById("email").value,\
      senha: document.getElementById("senha").value\
    \})\
  \}).then(() => alert("Cadastrado!"));\
\}\
\
function login() \{\
  fetch(API_URL, \{\
    method: "POST",\
    body: JSON.stringify(\{\
      action: "login",\
      email: document.getElementById("email").value,\
      senha: document.getElementById("senha").value\
    \})\
  \})\
  .then(r => r.json())\
  .then(data => \{\
    if (data.success) \{\
      localStorage.setItem("user", JSON.stringify(data.user));\
      window.location.href = "dashboard.html";\
    \} else \{\
      alert("Erro no login");\
    \}\
  \});\
\}\
\
function buscarHorarios() \{\
  let data = document.getElementById("data").value;\
\
  fetch(API_URL + "?action=horarios&data=" + data)\
  .then(r => r.json())\
  .then(horarios => \{\
    let div = document.getElementById("horarios");\
    div.innerHTML = "";\
\
    horarios.forEach(h => \{\
      div.innerHTML += `<button onclick="selecionar('$\{h\}')">$\{h\}</button>`;\
    \});\
  \});\
\}\
\
let horarioSelecionado = "";\
\
function selecionar(h) \{\
  horarioSelecionado = h;\
\}\
\
function agendar() \{\
  let user = JSON.parse(localStorage.getItem("user"));\
\
  fetch(API_URL, \{\
    method: "POST",\
    body: JSON.stringify(\{\
      action: "agendar",\
      nome: user.nome,\
      telefone: user.telefone,\
      email: user.email,\
      data: document.getElementById("data").value,\
      hora: horarioSelecionado,\
      servico: document.getElementById("servico").value\
    \})\
  \}).then(() => alert("Agendado!"));\
\}\
\
function carregarAgendamentos() \{\
  fetch(API_URL + "?action=agendamentos")\
  .then(r => r.json())\
  .then(lista => \{\
    let div = document.getElementById("lista");\
    div.innerHTML = JSON.stringify(lista);\
  \});\
\}}