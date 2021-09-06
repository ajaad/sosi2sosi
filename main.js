
// dette skriptet består stort sett av modifiserte kodesegmenter funnet på nett.

const TXTtoBlob = (data, contentType='', sliceSize=512) => {
  const byteCharacters = data;

  const byteArrays = [];
  
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
  
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    
    let j = 0;
    
    for (let i = 0; i < slice.length; i++) {
      let letter = slice.charCodeAt(i);
    
      if (letter != 195) {
        // Hopp over hver gang 195 dukker opp.
        
        if (letter == 166 ){
          // æ
          byteNumbers[j] = 230;
        } else if (letter == 184 ) {
          // ø
          byteNumbers[j] = 248;
        } else if (letter == 165 ) {
          //å
          byteNumbers[j] = 229;
        } else if (letter == 8224 ){
          // Æ
          byteNumbers[j] = 198;
        } else if (letter == 732 ) {
          // Ø
          byteNumbers[j] = 216;
        } else if (letter == 8230 ) {
          //Å
          byteNumbers[j] = 197;
        } else if (letter < 255 ) {
          // ta bort andre ikke støttede bokstaver
          // For eksempel: Ää Ńń á
          byteNumbers[j] = slice.charCodeAt(i)
        }
        
        j += 1;

      }

    }
    
    // Ny array med korrekt lengde
    const byteNumbers2 = new Array(j);
    
    // loop får å legge inn nye verdier.
    for (let i = 0; i < j; i++) {
      byteNumbers2[i] = byteNumbers[i];
    }
    
    const byteArray = new Uint8Array(byteNumbers2);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

///////////////////

function lastNed(filename, text) {
    // last ned fil 
    var element = document.createElement('a');
    
    element.setAttribute('href', text);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

}

///////////////////

function konverter(input){

    let file = document.querySelector("#sosiInn").files[0];
    
    utNavn = file.name.split(".")[0] + "_cp1252.sos";

    let reader = new FileReader();

    reader.readAsText(file);
    
    reader.onload = function() {
        
        const blob = TXTtoBlob(reader.result, 'binary');
        const blobUrl = URL.createObjectURL(blob);
        lastNed(utNavn, blobUrl);
        
    }
}

