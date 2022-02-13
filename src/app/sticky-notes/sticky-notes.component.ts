import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { StickyNotes } from '../models/sticky-notes.model';

@Component({
  selector: 'app-sticky-notes',
  templateUrl: './sticky-notes.component.html',
  styleUrls: ['./sticky-notes.component.css']
})
export class StickyNotesComponent implements OnInit {
  showForm: boolean = false;
  newTitle: string = "";
  newDescription: string ="";
  stickyNotesList: Array<StickyNotes> = [];
  showInnerContainer: boolean = false;
  currentStickyNoteForEdit: StickyNotes | null = null;
  constructor() { }

  ngOnInit(): void {
    this.stickyNotesList.push(new StickyNotes(1, "Daily plans", "- Pick up kids from school\n- Dinner\n- Continue reading a book\n- Watch some TV"));
    this.stickyNotesList.push(new StickyNotes(2, "Meal plan", "Lasagne\nLemon Chicken\nFish & Veggies\nPizza\n"));
    this.stickyNotesList.push(new StickyNotes(3, "Work", "Call Trish over zoom @ 9 am 1029 8397 321"));
      this.updateLocalStorage();
  }

  onEditStickyNote(StickyNotes: StickyNotes): void{
    this.stickyNotesList.map((currentStickyNoteForEdit: StickyNotes) => {
      if(currentStickyNoteForEdit.id === StickyNotes.id){
        currentStickyNoteForEdit.title = StickyNotes.title;
        currentStickyNoteForEdit.description = StickyNotes.description;
        this.currentStickyNoteForEdit = null;
      }
    })
    this.updateLocalStorage();
  }


 showFormToggle(){
    this.showForm = true;
  }

  hideForm(){
    this.showForm = false;
  }

  showInnerContainerToggle(){
this.showInnerContainer = true;
  }

  onAddSticker(): void{
    this.stickyNotesList.push(new StickyNotes(this.getNextId(), this.newTitle, this.newDescription))
    this.newTitle= "";
    this.newDescription= "";
    this.showInnerContainer = true;
    this.updateLocalStorage();
    
  }

  private getNextId(){
    let nextId = 0;
    if(this.stickyNotesList.length > 0){
      nextId = this.stickyNotesList[this.stickyNotesList.length -1].id;
      nextId++;
    }
    return nextId;
  }

  onDeleteStickyNote(StickyNotes: StickyNotes): void {
    this.stickyNotesList = this.stickyNotesList.filter((currentStickyItem: StickyNotes) => currentStickyItem.id !== StickyNotes.id);
    this.updateLocalStorage();
  }

  private updateLocalStorage(): void {
    localStorage.setItem('stickyNotesList', JSON.stringify(this.stickyNotesList));
  }

}
