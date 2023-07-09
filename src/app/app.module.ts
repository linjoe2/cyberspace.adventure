import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BlocklyComponent } from './components/blockly/blockly.component';
import { MissionComponent } from './components/mission/mission.component';
import { PhaserComponent } from './components/phaser/phaser.component'

@NgModule({
  declarations: [
    AppComponent,
    BlocklyComponent,
    MissionComponent,
    PhaserComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [BlocklyComponent]
})
export class AppModule { }