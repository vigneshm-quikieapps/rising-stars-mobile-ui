import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const colors = {
  darkpowderblue: '#0d47a1',
  white: 'rgb(255, 255, 255)',
  black: 'rgb(0, 0, 0)',
  orange: 'rgb(255, 163, 0)',
  errorColor: 'rgb(0, 0, 0)',
  blackOpacity: 'rgba(0, 0, 0, 0.5)',
  lineColor: 'rgba(255, 163, 0, 0.5)',

  grey: '#808080',
  // veryLightPink: 'rgba(255,244,231,1)',
  // veryLightGreen: 'rgba(192,248,232,1)',
  // veryLightRed: 'rgba(255,229,229,1)',
  // orangeYellow: 'rgba(255,163,0,1)',
  // pumpkinOrange: 'rgba(255,126,0,1)',
  veryLightPink: 'rgba(255,244,231,1)',
  veryLightGreen: 'rgba(192,248,232,1)',
  veryLightRed: 'rgba(255,229,229,1)',
  titleOrange: '#FCDD8C',
  orangeYellow: 'rgba(255,163,0,1)',
  pumpkinOrange: 'rgba(255,126,0,1)',
  reddish: 'rgb(204,66,66)',
  seafoamBlue: 'rgb(107,213,153)',
  pumpkinorange: '#ffe5cc',
  lightgrey: 'rgb(227,227,227)',
  profileColorGray: 'rgb(242, 242, 242)',
  buttonBorder: 'rgb (227 ,227 ,227)',
  modalBackgroundColor: 'rgba( 0, 0, 0, 0.8)',
  cancelMembership: 'rgb( 204, 66, 66)',
};

export const Fontsize = wp('4%');

export const Theme = ['#ffa300', '#ff7e00'];
export const Country_Code = '+91';
export const Today = new Date();
export const Term_Condition =
  " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting , remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
export const Stepend = '6';

export const gender = [
  {id: 1, title: 'Boy'},
  {id: 2, title: 'Girl'},
  {id: 3, title: 'other'},
];

export const EnrollData = [
  {id: 1, title: 'Step 1', description: 'Add Child and Emergency Contact'},
  {id: 2, title: 'Step 2', description: 'Class Selection'},
  {id: 3, title: 'Step 3', description: 'Fees Overview'},
  {id: 4, title: 'Step 4', description: 'Provide Consent'},
  {id: 5, title: 'Step 5', description: 'Additional Sections'},
  {id: 6, title: 'Step 6', description: 'Pay'},
  {id: 7, title: 'Step 7', description: 'Confirmation'},
];

export const Images = {
  Child: require('../assets/images/girl.jpg'),
  calendar: require('../assets/images/icon-date-line.png'),
  calendarOrange: require('../assets/images/icon-Attendance_Overview.png'),
  user: require('../assets/images/icon-coach-line.png'),
  star: require('../assets/images/icon-Activity_Progress-star.png'),
  star_gray: require('../assets/images/icon-Facility-line.png'),
  medal: require('../assets/images/icon-Activity_Progress.png'),
  completed: require('../assets/images/icon-check-line.png'),
  completed_white: require('../assets/images/checkmark.png'),
  dropDown_white: require('../assets/images/dropDown.png'),
};
export {wp, hp};
