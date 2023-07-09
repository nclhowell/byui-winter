import {Message} from './message.model';

export const MOCKMESSAGES: Message[] = [
  {
    id: '1',
   subject: 'CIT 366 assignment 1',
   msgText: 'The grades for this assignment have been posted.',
   sender:    {
    _id: '1',
    id: '1',
    name: 'Rex Barzee',
    email: 'barzeer@byui.edu',
    phone: '208-496-3768',
    imageUrl: '../../assets/images/barzeer.jpg',
    group: null
  }},
  {
    id: '2',
    subject: 'CIT 366 assignment 3',
    msgText: 'When is assignment 3 due?',
    sender:  {
      _id: '2',
      id: '2',
      name: 'Bradley Armstrong',
      email: 'armstrongb@byui.edu',
      phone: '208-496-3766',
      imageUrl: '../../assets/images/armstrongb.jpg',
      group: null
    }},
  {
    id: '3',
    subject: 'CIT 366 assignment 3 due date',
    msgText: 'Assignment 3 is due on Saturday at 11:30 PM.',
    sender: {
      _id: '3',
      id: '3',
      name: 'Lee Barney',
      email: 'barneyl@byui.edu',
      phone: '208-496-3767',
      imageUrl: '../../assets/images/barneyl.jpg',
      group: null
    }
  },
  {
    id: '4',
    subject: 'Assignment 3 help',
    msgText: 'Can I meet with you sometime? I need help with assignment 3.',
    sender:  {
      _id: '5',
      id: '5',
      name: 'Kory Godfrey',
      email: 'godfreyko@byui.edu',
      phone: '208-496-3770',
      imageUrl: '../../assets/images/godfreyko.jpg',
      group: null
    }
  },
  {
    id: '5',
    subject: 'Assignment 3 help',
    msgText: 'I can meet with you today at 4:00 PM in my office.',
    sender:  {
      _id: '7',
      id: '7',
      name: 'R. Kent Jackson',
      email: 'jacksonk@byui.edu',
      phone: '208-496-3771',
      imageUrl: '../../assets/images/jacksonk.jpg',
      group: null
    }}
];
