/**
 * @license
 *
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Blockly Angular Component.
 * @author samelh@google.com (Sam El-Husseini)
 */

import { Component, OnInit } from '@angular/core';

import * as Blockly from 'blockly';
import { BlocklyOptions } from 'blockly';
import {javascriptGenerator} from 'blockly/javascript';



@Component({
  selector: 'app-blockly',
  templateUrl: './blockly.component.html',
  styleUrls: ['./blockly.component.css']
})
export class BlocklyComponent implements OnInit {

  constructor() { 
     
  }


  ngOnInit() {
    const blocklyDiv = document.getElementById('blocklyDiv');
    var toolbox = {
      "kind":"categoryToolbox",
      "contents":[
        {
          "kind":"category",
          "name":"Logic",
          "categorystyle":"logic_category",
          "contents":[
            {
              "kind":"block",
              "type":"controls_if"
            },
            {
              "kind":"block",
              "type":"logic_compare"
            },
            {
              "kind":"block",
              "type":"logic_operation"
            },
            {
              "kind":"block",
              "type":"logic_negate"
            },
            {
              "kind":"block",
              "type":"logic_boolean"
            }
          ]
        },
        {
          "kind":"category",
          "name":"Loops",
          "categorystyle":"loop_category",
          "contents":[
            {
              "kind":"block",
              "type":"controls_repeat_ext",
              "inputs":{
                "TIMES":{
                  "block":{
                    "type":"math_number",
                    "fields":{
                      "NUM":10
                    }
                  }
                }
              }
            },
            {
              "kind":"block",
              "type":"controls_whileUntil"
            }
          ]
        },
        {
          "kind":"category",
          "name":"Math",
          "categorystyle":"math_category",
          "contents":[
            {
              "kind":"block",
              "type":"math_number",
              "fields":{
                "NUM":123
              }
            },
            {
              "kind":"block",
              "type":"math_arithmetic"
            },
            {
              "kind":"block",
              "type":"math_single"
            }
          ]
        },
        {
          "kind":"category",
          "name":"Text",
          "categorystyle":"text_category",
          "contents":[
            {
              "kind":"block",
              "type":"text"
            },
            {
              "kind":"block",
              "type":"text_length"
            },
            {
              "kind":"block",
              "type":"text_print"
            }
          ]
        },
        {
          "kind":"category",
          "name":"Library",
          "expanded":"true",
          "contents":[
            {
              "kind":"category",
              "name":"Password digits",
              "contents": [
                {
                  "kind": "block",
                  "type": "math_number",
                  "fields":{
                    "NUM":10
                  },
                  
                  "message0": 'length of %1',
                  "args0": [
                    {
                      "type": "input_value",
                      "name": "VALUE",
                      "check": "String"
                      
                    }
                  ],
                  
                  "output": "Number",
                  "colour": 160,
                  "tooltip": "Returns number of letters in the provided text.",
                  "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp",
                  "nextStatement": "Action",
                },
                {
                  'kind': 'block',
                  'type': 'get_digit',
                },
                {
                  'kind': "block",
                  "type": "move_left",
                },
                {
                  'kind': "block",
                  "type": "move_right",
                },
                {
                  'kind': "block",
                  "type": "forward",
                },
                                
              ]
            }
          ]
        }
      ]
    }
    
    
    const workspace = Blockly.inject(blocklyDiv || "", {
      readOnly: false,
      media: 'media/',
      trashcan: true,
      scrollbars: false,
      move: {
        scrollbars: true,
        drag: true,
        wheel: true
      },
      toolbox: toolbox
    } as BlocklyOptions);

    
    

   
    Blockly.defineBlocksWithJsonArray([
      // Block for colour picker.
      {
        "type": "get_digit",
        "message0": "%1",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "DIGIT",
            "options": [
              ["digit 1", "0"],
              ["digit 2", "1"],
              ["digit 3", "2"],
              ["digit 4", "3"],
            ]
          }
        ],
        "colour": 355,
        "output": 'number',        
      },
      {
        "type": "move_left",
        "lastDummyAlign0": "CENTRE",
        "message0": "move Left",
        "inputsInline": false,
        "previousStatement": "Action",
        "nextStatement": "Action",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
      },
      {
        "type": "move_right",
        "lastDummyAlign0": "CENTRE",
        "message0": "move right",
        "inputsInline": false,
        "previousStatement": "Action",
        "nextStatement": "Action",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
      },
      {
        "type": "forward",
        "lastDummyAlign0": "CENTRE",
        "message0": "forward",
        "inputsInline": false,
        "previousStatement": "Action",
        "nextStatement": "Action",
        "colour": 230,
        "tooltip": "",
        "helpUrl": ""
      }
    ]);
    
    // javascriptGenerator.forBlock['get_digit'] = function(block: any) {
    //   console.log('custom:',block.getFieldValue('DIGIT'))
    //   let number = block.getFieldValue('DIGIT')
    //   let code = ["1",'4','5','3']
    //   // return code[number];
    //   return [code[number], javascriptGenerator.javascript.ORDER_NONE];
    // };

    javascriptGenerator.forBlock['get_digit'] = function(block: any, generator: any) {
      var dropdown_name = block.getFieldValue('NAME');
      let number = block.getFieldValue('DIGIT')

      // var value_digit = generator.valueToCode(block, 'digit', javascript.Order.ATOMIC);
      // TODO: Assemble javascript into code variable.
      var code = ["1",'4','5','3'];
      // TODO: Change ORDER_NONE to the correct strength.
      return [code[number], javascriptGenerator.ORDER_NONE];
    };
    
    javascriptGenerator.forBlock['move_left'] = function(block: any) {
      return 'move.left()';
    };

    javascriptGenerator.forBlock['move_right'] = function(block: any) {
      return 'move.right()';
    };

    javascriptGenerator.forBlock['forward'] = function(block: any) {
      return 'move.forward()';
    };


    var startBlocks = {
      "blocks":{
        "languageVersion":0,
        "blocks":[
          
        ]
      }
    }
  Blockly.serialization.workspaces.load(startBlocks, workspace);

  

  workspace.addChangeListener(()=>{this.updateCode(workspace)});

    

  }

  

  

  onSave(workspace: any) {
    const serializer = new Blockly.serialization.variables.VariableSerializer();
    const state = serializer.save(workspace);
    console.log(state)
    // serializer.load(state, workspace);
  }

  updateCode(workspace:Blockly.WorkspaceSvg ) {
    const code = javascriptGenerator.workspaceToCode(workspace);
    // document.getElementById('textarea').value = code;
    console.log(code)
  }
  

}