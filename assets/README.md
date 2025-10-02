# Note per deploy su Awardspace

Poichè l'hosting su Awardspace blocca contenuti come png o jpg è necessario aggiungere nella cartella assets presente in dist (risultato dello script `npm run build`) il file **serve.php**.

Questo file si occupa di servire i file png richiesti all'interno della cartella assets mediante la seguente chiamata:

```js
/assets/serve.php?f=logo.png
```

E' stato aggiunto anche un file **.htaccess** affinchè possa essere omessa l'estensione .php nella chiamata al file, ottendo così un risultato di questo tipo:

```js
/assets/serve?f=logo.png
```
