// This file was automatically generated from common.soy.
// Please don't edit this file by hand.

if (typeof apps == 'undefined') { var apps = {}; }


apps.messages = function(opt_data, opt_ignored, opt_ijData) {
  return '<div style="display: none"><span id="subtitle">Ένα οπτικό περιβάλλον προγραμματισμού</span><span id="blocklyMessage">Blockly (Μπλοκλι)</span><span id="codeTooltip">Δες τον κώδικα JavaScript που δημιουργήθηκε.</span><span id="linkTooltip">Αποθήκευση και σύνδεση στο μπλοκ.</span><span id="runTooltip">Εκτέλεσε το πρόγραμμα που ορίζεται από τα μπλοκ \\nστο χώρο εργασίας. </span><span id="runProgram">Εκτέλεση Προγράμματος</span><span id="resetProgram">Επανεκκίνηση</span><span id="dialogOk">ΟΚ</span><span id="dialogCancel">Ακύρωση</span><span id="catLogic">Λογική</span><span id="catLoops">Επαναλήψεις</span><span id="catMath">Μαθηματικά</span><span id="catText">Κείμενο</span><span id="catLists">Λίστες</span><span id="catColour">Χρώμα</span><span id="catVariables">Μεταβλητές</span><span id="catProcedures">Διαδικασίες</span><span id="httpRequestError">Υπήρξε πρόβλημα με το αίτημα.</span><span id="linkAlert">Μοιράσου τα blocks σου με αυτό το σύνδεσμο:\n\n%1</span><span id="hashError">Λυπάμαι, το «%1» δεν αντιστοιχεί σε κανένα αποθηκευμένο πρόγραμμα.</span><span id="xmlError">Δεν μπορώ να φορτώσω το αποθηκευμένο αρχείο σου.  Μήπως δημιουργήθηκε από μία παλιότερη έκδοση του Μπλόκλι.</span><span id="listVariable">Λίστα</span><span id="textVariable">κείμενο</span></div>';
};


apps.dialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogShadow" class="dialogAnimate"></div><div id="dialogBorder"></div><div id="dialog"></div>';
};


apps.codeDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogCode" class="dialogHiddenContent"><pre id="containerCode"></pre>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.storageDialog = function(opt_data, opt_ignored, opt_ijData) {
  return '<div id="dialogStorage" class="dialogHiddenContent"><div id="containerStorage"></div>' + apps.ok(null, null, opt_ijData) + '</div>';
};


apps.ok = function(opt_data, opt_ignored, opt_ijData) {
  return '<div class="farSide" style="padding: 1ex 3ex 0"><button class="secondary" onclick="BlocklyApps.hideDialog(true)">ΟΚ</button></div>';
};

;
// This file was automatically generated from template.soy.
// Please don't edit this file by hand.

if (typeof turtlepage == 'undefined') { var turtlepage = {}; }


turtlepage.messages = function(opt_data, opt_ignored, opt_ijData) {
  return apps.messages(null, null, opt_ijData) + '<div style="display: none"><span id="Turtle_moveTooltip">Μετακινεί τη χελώνα προς τα εμπρός ή προς τα \\nπίσω κατά το ορισμένο ποσό. </span><span id="Turtle_moveForward">κινήσου μπροστά κατά</span><span id="Turtle_moveBackward">κινήσου προς τα πίσω κατά</span><span id="Turtle_turnTooltip">Γυρίζει η χελώνα αριστερά ή δεξιά κατά τον \\nκαθορισμένο αριθμό των μοιρών. </span><span id="Turtle_turnRight">στρίψε δεξιά κατά</span><span id="Turtle_turnLeft">στρίψε αριστερά κατά</span><span id="Turtle_widthTooltip">Αλλάζει το φάρδος του στυλό.</span><span id="Turtle_setWidth">ορίστε το πλάτος ίσο προς</span><span id="Turtle_colourTooltip">Αλλάζει το χρώμα της πένας.</span><span id="Turtle_setColour">αλλαγή χρώματος σε</span><span id="Turtle_penTooltip">Ανεβάζει ή κατεβάζει την πένα για να σταματήσει \\nή να ξεκινήσει να ζωγραφίζει. </span><span id="Turtle_penUp">πένα πάνω</span><span id="Turtle_penDown">πένα κάτω</span><span id="Turtle_turtleVisibilityTooltip">Κάνει τη χελώνα (πράσινος κύκλος και βέλος) \\nορατή ή αόρατη. </span><span id="Turtle_hideTurtle">κρύψε τη χελώνα</span><span id="Turtle_showTurtle">εμφάνισε τη χελώνα</span><span id="Turtle_printHelpUrl">http://el.wikipedia.org/wiki/%CE%A4%CF%85%CF%80%CE%BF%CE%B3%CF%81%CE%B1%CF%86%CE%AF%CE%B1</span><span id="Turtle_printTooltip">Γράφει το κείμενο στην κατεύθυνση της χελώνας \\nξεκινώντας από την τρέχουσα θέση της. </span><span id="Turtle_print">εκτύπωση</span><span id="Turtle_fontHelpUrl">http://el.wikipedia.org/wiki/%CE%93%CF%81%CE%B1%CE%BC%CE%BC%CE%B1%CF%84%CE%BF%CF%83%CE%B5%CE%B9%CF%81%CE%AC</span><span id="Turtle_fontTooltip">Καθορίζει τη γραμματοσειρά που χρησιμοποιείται \\nαπό το μπλοκ της εκτύπωσης. </span><span id="Turtle_font">γραμματοσειρά</span><span id="Turtle_fontSize">μέγεθος γραμματοσειράς</span><span id="Turtle_fontNormal">κανονικό</span><span id="Turtle_fontBold">Έντονο</span><span id="Turtle_fontItalic">πλάγια γραφή</span><span id="Turtle_unloadWarning">Η εγκατάλειψη αυτή της σελίδας θα έχει ως αποτέλεσμα να χαθεί η εργασία σας.</span></div>';
};


turtlepage.start = function(opt_data, opt_ignored, opt_ijData) {
  return turtlepage.messages(null, null, opt_ijData) + '<table width="100%"><tr><td><h1><span id="title"><a href="../index.html">Blockly (Μπλοκλι)</a> : Γραφικά με τη Χελώνα</span></h1></td><td class="farSide"><select id="languageMenu" onchange="BlocklyApps.changeLanguage();"></select></td></tr></table><div id="visualization"><canvas id="scratch" width="400" height="400" style="display: none"></canvas><canvas id="display" width="400" height="400"></canvas></div><table style="padding-top: 1em;"><tr><td style="width: 190px; text-align: center; vertical-align: top;"><script type="text/javascript" src="../slider.js"><\/script><svg id="slider" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="150" height="50"><!-- Slow icon. --><clipPath id="slowClipPath"><rect width=26 height=12 x=5 y=14 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=-21 y=-10 clip-path="url(#slowClipPath)" /><!-- Fast icon. --><clipPath id="fastClipPath"><rect width=26 height=16 x=120 y=10 /></clipPath><image xlink:href="icons.png" height=42 width=84 x=120 y=-11 clip-path="url(#fastClipPath)" /></svg></td><td style="width: 15px;"><img id="spinner" style="visibility: hidden;" src="loading.gif" height=15 width=15></td><td style="width: 190px; text-align: center"><button id="runButton" class="primary" onclick="Turtle.runButtonClick();" title="Η χελώνα ξεκινάει να κάνει αυτό που λένε το μπλοκ."><img src="../../media/1x1.gif" class="run icon21">Εκτέλεση Προγράμματος</button><button id="resetButton" class="primary" onclick="Turtle.resetButtonClick();" style="display: none"><img src="../../media/1x1.gif" class="stop icon21"> Επανεκκίνηση</button></td></tr></table><div id="toolbarDiv"><button class="notext" title="Δες τον κώδικα JavaScript που δημιουργήθηκε." onclick="BlocklyApps.showCode(this);"><img src=\'../../media/1x1.gif\' class="code icon21"></button><button id="linkButton" class="notext" title="Αποθήκευση και σύνδεση στο μπλοκ." onclick="BlocklyStorage.link();"><img src=\'../../media/1x1.gif\' class="link icon21"></button><button class="notext" id="captureButton" title="Αποθηκεύστε το σχέδιο." onclick="Turtle.createImageLink();"><img src=\'../../media/1x1.gif\' class="img icon21"></button><a id="downloadImageLink" download="σχέδιο.png"></a></div><script type="text/javascript" src="../../blockly_compressed.js"><\/script><script type="text/javascript" src="../../javascript_compressed.js"><\/script><script type="text/javascript" src="../../' + soy.$$escapeHtml(opt_ijData.langSrc) + '"><\/script><script type="text/javascript" src="blocks.js"><\/script>' + turtlepage.toolbox(null, null, opt_ijData) + '<div id="blockly"></div>' + apps.dialog(null, null, opt_ijData) + apps.codeDialog(null, null, opt_ijData) + apps.storageDialog(null, null, opt_ijData);
};


turtlepage.toolbox = function(opt_data, opt_ignored, opt_ijData) {
  return '<xml id="toolbox" style="display: none"><category name="Χελώνα"><block type="draw_move"><value name="VALUE"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="draw_turn"><value name="VALUE"><block type="math_number"><title name="NUM">90</title></block></value></block><block type="draw_width"><value name="WIDTH"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="draw_pen"></block><block type="turtle_visibility"></block><block type="draw_print"><value name="TEXT"><block type="text"></block></value></block><block type="draw_font"></block></category><category name="Χρώμα"><block type="draw_colour"><value name="COLOUR"><block type="colour_picker"></block></value></block><block type="colour_picker"></block><block type="colour_random"></block><block type="colour_rgb"></block><block type="colour_blend"></block></category><category name="Λογική"><block type="controls_if"></block><block type="logic_compare"></block><block type="logic_operation"></block><block type="logic_negate"></block><block type="logic_boolean"></block><block type="logic_ternary"></block></category><category name="Επαναλήψεις"><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><title name="NUM">10</title></block></value></block><block type="controls_whileUntil"></block><block type="controls_for"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">10</title></block></value><value name="BY"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="controls_forEach"></block><block type="controls_flow_statements"></block></category><category name="Μαθηματικά"><block type="math_number"></block><block type="math_arithmetic"></block><block type="math_single"></block><block type="math_trig"></block><block type="math_constant"></block><block type="math_number_property"></block><block type="math_change"><value name="DELTA"><block type="math_number"><title name="NUM">1</title></block></value></block><block type="math_round"></block><block type="math_on_list"></block><block type="math_modulo"></block><block type="math_constrain"><value name="LOW"><block type="math_number"><title name="NUM">1</title></block></value><value name="HIGH"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_int"><value name="FROM"><block type="math_number"><title name="NUM">1</title></block></value><value name="TO"><block type="math_number"><title name="NUM">100</title></block></value></block><block type="math_random_float"></block></category><category name="Λίστες"><block type="lists_create_empty"></block><block type="lists_create_with"></block><block type="lists_repeat"><value name="NUM"><block type="math_number"><title name="NUM">5</title></block></value></block><block type="lists_length"></block><block type="lists_isEmpty"></block><block type="lists_indexOf"><value name="VALUE"><block type="variables_get"><title name="VAR">Λίστα</title></block></value></block><block type="lists_getIndex"><value name="VALUE"><block type="variables_get"><title name="VAR">Λίστα</title></block></value></block><block type="lists_setIndex"><value name="LIST"><block type="variables_get"><title name="VAR">Λίστα</title></block></value></block><block type="lists_getSublist"><value name="LIST"><block type="variables_get"><title name="VAR">Λίστα</title></block></value></block></category><category name="Μεταβλητές" custom="VARIABLE"></category><category name="Διαδικασίες" custom="PROCEDURE"></category></xml>';
};
