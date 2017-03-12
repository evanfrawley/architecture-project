/**
 * Created by Wei-Jen on 1/21/17.
 */
"use strict";
var resistance_1 = require("./resistance");
var manager = new resistance_1.ResistanceManager();
// Checking addMember
manager.addMember('Ada', 'ada@email.com', '98195');
manager.addMember('Joel', 'joel@email.com', '98406');
manager.addMember('Andy', 'andy@email.com', '92602');
console.log(manager.getMembers());
// Checking addProtest
manager.addProtest('Washington DC Inauguration Protest', '20001', 'Jan 21 2017 13:00 PST');
manager.addProtest('Washington DC Women March', '20001', 'Jan 21 2017 13:00 PST');
manager.addProtest('Seattle Women March', '98105', 'Jan 21 2017 8:00 PST');
manager.addProtest('Spokane Women March', '90005', 'Jan 21 2017 9:00 PST');
console.log(manager.getProtests());
// Checking addMovement
manager.addMovement('Black Lives Matter');
manager.addMovement('Women Lives Matter');
manager.addMovement('Raise The Minimum Wage');
console.log(manager.getMovements());
// Checking addMemberToProtest
manager.addMemberToProtest('Ada', 'Seattle Women March');
manager.addMemberToProtest('Ada', 'Seattle Women March'); // Should not get added again
console.log(manager.getProtests()[1].getProtesters());
// Checking search functions
console.log(manager.findMemberNames('a'));
console.log(manager.findProtestNames('women'));
console.log(manager.findMovementNames('lives'));
// Checking modifyProtest
manager.modifyProtest('Seattle Women March', 'Seattle Women March 2017', 'Jan 2 2017 8:00 PST');
console.log(manager.findProtestNames('Seattle Women March'));
// Checking AddProtestToMovement
manager.addProtestToMovement('Spokane Women March', 'Women Lives Matter');
manager.addProtestToMovement('Spokane Women March', 'Women Lives Matter'); // Should not get added again
console.log(manager.getMovements()[1].getProtests());
// Checking getProtesters
console.log(manager.getProtesters('Seattle Women March 2017'));
// Checking getUsersNearProtest
console.log(manager.getUsersNearProtest('Seattle Women March 2017', 30));
// Checking getNearbyProtests
manager.addProtestToMovement('Washington DC Women March', 'Women Lives Matter');
console.log(manager.getNearbyProtests('20001', 30));
