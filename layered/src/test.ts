/**
 * Created by Wei-Jen on 1/21/17.
 */

import {ResistanceModel} from './resistance-model';

let manager = new ResistanceModel();

console.log('Checking addMember');
manager.addMember('Ada', 'ada@email.com', '98195');
manager.addMember('Joel', 'joel@email.com', '98406');
manager.addMember('Andy', 'andy@email.com', '92602');
console.log(manager.getMembers());

console.log('Checking addProtest');
manager.addProtest('Washington DC Inauguration Protest','20001', 'Jan 21 2017 13:00 PST');
manager.addProtest('Washington DC Women March','20001', 'Jan 21 2017 13:00 PST');
manager.addProtest('Seattle Women March', '98105', 'Jan 21 2017 8:00 PST');
manager.addProtest('Spokane Women March', '90005', 'Jan 21 2017 9:00 PST');
console.log(manager.getProtests());

console.log('Checking addMovement');
manager.addMovement('Black Lives Matter');
manager.addMovement('Women Lives Matter');
manager.addMovement('Raise The Minimum Wage');
console.log(manager.getMovements());

console.log('Checking addMemberToProtest');
manager.addMemberToProtest('Ada', 'Seattle Women March');
manager.addMemberToProtest('Ada', 'Seattle Women March'); // Should not get added again
console.log(manager.getProtests()[1].getProtesters());

console.log('Checking search functions');
console.log(manager.findMemberNames('a'));
console.log(manager.findProtestNames('women'));
console.log(manager.findMovementNames('lives'));

console.log('Checking modifyProtest');
manager.modifyProtest('Seattle Women March', 'Seattle Women March 2017', 'Jan 2 2017 8:00 PST');
console.log(manager.findProtestNames('Seattle Women March'));

console.log('Checking AddProtestToMovement');
manager.addProtestToMovement('Spokane Women March', 'Women Lives Matter');
manager.addProtestToMovement('Spokane Women March', 'Women Lives Matter'); // Should not get added again
console.log(manager.getMovements()[1].getProtests());

console.log('Checking getProtesters');
console.log(manager.getProtesters('Seattle Women March 2017'));

console.log('Checking getUsersNearProtest');
console.log(manager.getUsersNearProtest('Seattle Women March 2017', 30));

console.log('Checking getNearbyProtests');
manager.addProtestToMovement('Washington DC Women March', 'Women Lives Matter');
console.log(manager.getNearbyProtests('20001', 30));

