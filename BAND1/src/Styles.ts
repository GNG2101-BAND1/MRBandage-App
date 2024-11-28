import {StyleSheet} from 'react-native';
import {colours} from './Values';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colours.bgColour,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '5%',
  },

  progressBar: {
    flexDirection: 'row',
    width: '50%',
  },

  progressBarUnitFocused: {
    flex: 2,
    margin: 5,
    elevation: 2,
  },

  progressBarUnitUnfocused: {
    flex: 1,
    margin: 5,
  },

  appName: {
    marginTop: 10,
    fontSize: 36,
    color: colours.brandDarkRed,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  appSlogan: {
    marginBottom: 10,
    fontSize: 15,
    color: colours.brandLightOrange,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  bigLogo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '80%',
    maxHeight: '50%',
    minHeight: '45%',
  },

  displayBox: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    height: '20%',
    flex: 1,
  },

  viewContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultTitleView: {
    marginLeft: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },

  iconTextBox: {
    padding: 10,
    marginTop: 10,
  },
  selectedIconTextBox: {
    borderWidth: 1,
  },

  text: {
    color: colours.textDarkBlue,
    fontSize: 15,
  },
  deviceListTitle: {
    color: colours.textDarkBlue,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  boldText: {
    color: colours.textDarkBlue,
    fontSize: 15,
    fontWeight: 'bold',
  },

  iconViewContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  image: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },

  iconTextBoxImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  loadingGIF: {
    width: 60,
    height: 60,
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 1,
    backgroundColor: colours.brandDarkRed,
    margin: 20,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colours.bgColour,
  },

  hyperlink: {
    textDecorationLine: 'underline',
  },

  caption: {
    color: colours.brandDarkRed,
    fontSize: 14,
    fontWeight: 'bold',
  },

  horizontalSameLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    maxHeight: '25%',
    width: '100%',
    margin: 10,
  },
  bottomAlignContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },

  centerAlignContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  spacedEvenlyContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  leftAlignContainer: {
    alignSelf: 'flex-start',
  },

  heading: {
    color: colours.brandDarkRed,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  deviceTitle: {
    color: colours.textDarkBlue,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },

  backBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colours.brandDarkRed,
    textDecorationLine: 'underline',
  },

  resultHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  resultMessage: {
    fontSize: 14,
    textAlign: 'center',
  },

  temperatureContent: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },

  avgTemp: {
    display: 'flex',
    flexDirection: 'column',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    color: colours.brandDarkRed,
  },
  modalGradient: {
    width: '80%',
    borderRadius: 10,
    marginBottom: 10,
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
  },
  modalIndicator: {
    position: 'absolute',
    top: -5,
    width: 10,
    height: 60,
    borderRadius: 5,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 2,
  },
  modalSlider: {
    width: '100%',
  },
  modalPHValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colours.textDarkBlue,
  },
  modalCloseBtn: {
    backgroundColor: colours.brandDarkRed,
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  modalCloseBtnText: {
    color: 'white',
    fontWeight: 'bold',
  },
  attachmentImage: {
    width: '100%',
    height: '55%',
    objectFit: 'contain',
  },

  calibrationText: {
    paddingBottom: 50,
  },
  permBtn: {
    padding: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  permBtnText: {
    color: colours.textDarkBlue,
    fontWeight: 'bold',
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
});

export default styles;
