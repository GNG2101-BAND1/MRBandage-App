import {StyleSheet} from 'react-native';
import {colours} from './Values';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colours.bgColour,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
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
    margin: 10,
    fontSize: 36,
    color: colours.brandDarkRed,
    textAlign: 'center',
  },

  appSlogan: {
    margin: 5,
    fontSize: 15,
    color: colours.brandLightOrange,
    textAlign: 'center',
  },

  bigLogo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '80%',
    maxHeight: '50%',
    flex: 1,
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
  },

  viewContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    color: colours.textDarkBlue,
    fontSize: 15,
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
    fontSize: 12,
    marginBottom: '10%',
  },

  horizontalSameLine: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  bottomAlignContainer: {
    flex: 1,
    maxHeight: '50%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default styles;
