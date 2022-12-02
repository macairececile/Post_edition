import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {EditionService} from "../../services/edition-service";
import {LanguageService} from "../../services/language-service";
import {SaveDataService} from "../../services/save-data.service";
import {MatDialog} from "@angular/material/dialog";
import {NgForm} from "@angular/forms";
import {DialogMaxWordsComponent} from "../dialog-max-words/dialog-max-words.component";
declare var monitorInput:any;
declare var getUrlPicto:any;
declare var getTokensForTS:any;
declare var getKeyPicto:any;
declare var clearUrlImageJS:any;

export interface Sentences{
  sentence: string,
  pictos:string
}

@Component({
  selector: 'app-home',
  templateUrl: './post_edition.component.html',
  styleUrls: ['./post_edition.component.css']
})

export class PostEdition implements OnInit {

  progress_bar_val: number = 0;
  id_sentence:number = 0;
  sentences: Sentences[] = [];
  result:string[][] = [];
  displayResult:string[][] = [];
  resultTab:string[] = [];
  cellsToScroll:number = 4;
  wordSearch:string = '';
  banksChecked:string[] = ['arasaac', 'mulberry'];
  wordsText: any;
  keyPicto:string[][] = [];
  dataRegisterChecked: boolean = true;
  keyDouble: boolean = false;
  is_selected:boolean = false;
  selected_image:string = '';
  double_click:boolean = false;
  style_selected_image:string = '';
  index_picto_to_delete:number = 0;
  clicked = false;

  constructor(public languageService: LanguageService,
              public editionService: EditionService,
              public saveData: SaveDataService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.editionService.isSearch = false;
  }

  pictos = [
    6536,
    2608,
    5465
  ];

  onSubmit(formText: NgForm) {
    this.resetRequest();
    this.wordSearch = formText.form.value.text;
    const numberOfWord = this.wordSearch.split(' ');
    this.editionService.wordsSearchTab = numberOfWord;
    if(numberOfWord.length > 50){
      this.openDialog();
      return;
    }
    let textInput = formText.form.value.text.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    monitorInput(textInput, this.languageService.languageSearch);
    setTimeout(()=> {
      this.result = getUrlPicto();
      this.editionService.result = this.result;
      this.keyPicto = getKeyPicto();
      console.log('keys : ', this.keyPicto);
      for (let i=0; i<this.result.length; i = i+1){
        this.result[i].forEach(value => {
          const tabValue = value.split('/');
          if(this.banksChecked.includes(tabValue[5])){
            this.resultTab.push(value);
          }
        });
        this.displayResult.push(this.resultTab);
        this.resultTab = [];
      }
      this.wordsText = getTokensForTS();
      console.log('this.wordsText : ',this.wordsText);
      this.editionService.wordsText = this.wordsText;
      this.editionService.wordsTextSave = JSON.parse(JSON.stringify(this.wordsText));
      this.editionService.isSearch = true;
      if(this.dataRegisterChecked){
        this.saveData.dataRegisterChecked = true;
        this.saveData.addDataSearched(this.editionService.wordsText);
      }else{
        this.saveData.dataRegisterChecked = false;
      }
      numberOfWord.forEach(word => {
        this.editionService.imageSelected.push('null');
      });
      this.duplicateCaseKey(this.keyPicto);
      this.debug();
    },500);
  }

  // chooseBank(arasaac: HTMLInputElement, mulberry: HTMLInputElement) {
  //   if(!arasaac.checked){
  //     this.banksChecked = this.banksChecked.filter((bank) => bank != arasaac.value);
  //   }
  //   if(!mulberry.checked){
  //     this.banksChecked = this.banksChecked.filter((bank) => bank != mulberry.value);
  //   }
  //   if(arasaac.checked){
  //     this.banksChecked.push(arasaac.value);
  //   }
  //   if(mulberry.checked){
  //     this.banksChecked.push(mulberry.value);
  //   }
  // }

  resetRequest(){
    clearUrlImageJS();
    this.result = [];
    this.result.length = 0;
    this.editionService.result = [];
    this.editionService.imageSelected = [];
    this.displayResult = [];
    this.displayResult.length = 0;
    this.keyPicto.length = 0;
    this.wordSearch = '';
    this.keyDouble = false;
  }

  // Download( url: any, filename: any ) {
  //   let setFetching = false;
  //   let setError = false;
  //
  //   const download = (url: RequestInfo, name: string | any[]) => {
  //     if (!url) {
  //       throw new Error("Resource URL not provided! You need to provide one");
  //     }
  //     setFetching =true;
  //     fetch(url)
  //         .then(response => response.blob())
  //         .then(blob => {
  //           setFetching =false;
  //           const blobURL = URL.createObjectURL(blob);
  //           const a = document.createElement("a");
  //           a.href = blobURL;
  //
  //           if (name && name.length) if (typeof name === "string") {
  //             a.download = name;
  //           }
  //           document.body.appendChild(a);
  //           a.click();
  //         })
  //         .catch(() => setError = true);
  //   };
  //
  //   download(url,filename);
  // }

  openDialog(){
    this.dialog.open(DialogMaxWordsComponent, {
      height: '20%',
      width: '30%',
    });
  }

  erase() {
    (<HTMLInputElement>document.getElementById("sentence-input")).value = "";
  }

  select(image: string,index: number) {
    this.editionService.imageSelected[index] = image;
    this.is_selected = true;
    let tabImage: any[] = image.split('/')
    this.selected_image = tabImage[tabImage.length - 1];
  }

  addPicto(){
    console.log(this.selected_image);
    this.pictos.push(Number(this.selected_image));
  }

  set_width_translation_box(pictos: number[]){
    let num_pictos = pictos.length
    return String(num_pictos * 150 + 150)
  }

  // dataRegister(data: HTMLInputElement) {
  //   this.dataRegisterChecked = data.checked;
  // }

  private debug() {
    console.log('result : ', this.editionService.result);
    console.log('displayResult : ', this.displayResult);
  }
  replaceAllElem (text:string) {
    while (text.includes("e")){
      text = text.replace("e", "");
    }
    return text;
  }
  //duplication par clé
  duplicateCaseKey(keys :string[][]){
    this.keyDoublon(keys);
    keys.forEach((listKeys,indexListKeys) => {
      listKeys = [...new Set(listKeys)];
      //delete all "e" in keys
      listKeys.forEach((key,indexKey) => {
        listKeys[indexKey] = this.replaceAllElem(key);
      });
      listKeys.forEach((key) => {
        const allKeys = key.split('-');
        // we don't want to do something about the first key
        let first = true
        allKeys.forEach((keySplited) => {
          const index = Number(keySplited);
          let indexForResult = listKeys.indexOf(keySplited);
          if(indexListKeys-1 > 0){
            if(listKeys[0].includes('-') && keys[indexListKeys-1][0][0] === listKeys[0][0]){
              indexForResult = 0;
            }
          }
          //console.log('listKeys : ', listKeys, 'keySplited pour index : ',keySplited, 'indexForResult : ', indexForResult);
          if(!first && indexForResult === -1){
            this.displayResult.splice(index,0,this.displayResult[Number(allKeys[0])]);
            this.result.splice(index,0,this.result[Number(allKeys[0])]);
          }else{
            first = false;
          }
        });
      });
    });
  }

  private keyDoublon(keys: string[][]) {
    let indexToDeleteInUrlArray: number[] = [];
    keys.forEach((key,indexDoubleKey) => {
      if(key[0].includes('-')){
        const splitKey = key[0].split('-');
        splitKey.forEach(keySplited => {
          keys.forEach((keytab, indexKeytab) => {
            const indexForResult = keytab.indexOf(keySplited);
            if(indexForResult !== -1){
              indexToDeleteInUrlArray.push(indexDoubleKey);
              this.displayResult[indexDoubleKey].forEach(url => {
                this.displayResult[indexKeytab].push(url);
                this.result[indexKeytab].push(url);
              });
            }
          });
        });
      }
    });
    indexToDeleteInUrlArray = [... new Set(indexToDeleteInUrlArray)];
    //reverse because if we delete first element, the other will be at the wrong index
    indexToDeleteInUrlArray.reverse();
    indexToDeleteInUrlArray.forEach(index => {
      this.result.splice(index,1);
      this.displayResult.splice(index,1);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.pictos, event.previousIndex, event.currentIndex);
  }

  set_progress_bar(progress_val:number){
    this.progress_bar_val = progress_val
  }

  goLoad(nameFile: string){
    // @ts-ignore
    this.sentences = (function () {
      let json = null;
      $.ajax({
        'async': false,
        'global': false,
        'url': '../../../assets/' + nameFile,
        'dataType': "json",
        'success': function (data: any) {
          console.log(data)
          json = data;
        }
      });
      return json;
    })();
  }

  // getSentence(json:string){
  //   this.goLoad("sentences.json")
  //   return this.sentences[0].sentence
  // }

  getPictos(){
    this.goLoad("sentences.json")
    let id_pictos = this.sentences[0].pictos.split(',')
    return id_pictos
  }

  printPictos(){
    let pictos = this.getPictos()
    console.log('keys : ', pictos.keys());
  }


  // get_number_sentences(){
  //   return sentences.sentences_list.length
  // }

  // update_progress_bar(){
  //   return this.id_sentence / this.get_number_sentences()
  // }
  doubleClick(index_picto:number) {
    this.clicked = false
    this.double_click = true
    this.style_selected_image = 'border: 5px solid #555;'
    this.index_picto_to_delete = index_picto
  }

  deletePicto() {
    this.pictos.splice(this.index_picto_to_delete, 1)
  }
}
