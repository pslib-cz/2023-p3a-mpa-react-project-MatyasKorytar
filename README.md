# Hra Kurník

## Téma
Hra je pro 2-4 hráče
Účelem této hry je získat plný kurník - 9 slepic. 

Hra probíhá tak, že každý hráč vždy hází dvoumi kostkami (= 2x náhodné číslo). 
Pokud je na kostkách rozdílný počet "puntíků", hráč dostane vejce, kuře nebo slepici podle následujícího schématu.
Za každou kostku, na níž jsou: 
1) 1,2 nebo 3 - hráč dostává vejce
2) 4 nebo 5 - hráč dostává kuře
3) 6 - hráč dostává slepici

Pokud je na kostkách stejný počet puntíků, řídíme se takto:
1) 1 a 1 - Na farmu se vplížila liška, pokud hráč nemá kohouta, přijde o všechny slepice.
2) 2 a 2 - Hráč odevzdává jedno kuře vybranému hráči.
3) 3 a 3 - Hráč odevzdává jednu slepici danému hráči.
4) 4 a 4 - Přišla bída a na farmě se musely sníst všechna vejce - Odebrání všech vajec.
5) 5 a 5 - Hráč hází kostkou podruhé, pokud hodí:
- 1 nebo 2 - Nehraje 1 nebo 2 kola.
- 3,4 nebo 5 - ztrácí všechna kuřata.
- 6 - ztrácí všechny slepice.
6) 6 a 6 - Na farmu se vplížila liška, pokud hráč nemá kohouta, přijde o všechny slepice.

Hráč, který se vzdá hodu kostkami, může provést jednu výměnu pro slepici a až 2 pro kuřata.
Lze vyměnit:
- 3 vejce za 1 kuře.
- 3 kuřata za 1 slepici.
- 2 slepice za 1 kohouta - kohout varuje farmáře před liškou, a tak díky němu hřáč nepřijde o žádnou slepici.

      

## Odkazy pro vývoj

Zde budou živé linky na:
- figma návrh stránek aplikace
- odkaz na gh-pages projektu
- odkaz do repozitáře projektu, pokud pracuji v teamu a zde vývoj neprobíhá

### Z čeho čerpat

- interaktivní hra (předělávka "deskovky")
- mohlo by být použitelné jako solitaire
- nebo "AI" protihráč
- inspirovat se můžete na [zatrolených hrách](https://www.zatrolene-hry.cz/katalog-her/?fType=cat&keyword=&theme=-1&category=-1&minlength=-1&maxlength=-1&localization=6%2C+7%2C+8&min_players=1&max_players=1&age=-1)...
- karetní hry méně typické - např. [Kabo](https://www.zatrolene-hry.cz/spolecenska-hra/kabo-8341/)
- učitelem oblíbená [Cartagena](https://www.zatrolene-hry.cz/spolecenska-hra/cartagena-422/) stále čeká na remake

### Techniky

- využití localStorage / sessionStorage
- čtení dat z externího RestAPI (fetch)
- operace DnD
- využití react-routeru
- funkčnost na mobilu (výjimka je předělávka komplexních deskových her)

### Co není obsahem 

- databáze
- bez vlastních backend service
- trapné věci: *klasické karetní hry*, *člověče nezlob se*, ...
