import {StyleSheet} from 'react-native';
import { COLORS } from '../../constants/constants';

export default StyleSheet.create({
  container: {
    
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'space-around',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
    marginVertical: 15,
    backgroundColor: '#EBF4E8',
  },
  BHKContainer: {
    borderColor: 'black',
    backgroundColor: '#EBF4E8',
    justifyContent: 'space-around',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
    textAlign: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },
  verticalLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#909090',
  },
  heyContainer: {
    
    marginTop: 20,
    marginLeft: 20,
  },
  heyText: {
    fontSize: 20,
    color: '#000',
  },
  infoContainer: {
    marginTop: 20,
    marginLeft: 20,
  },
  infoText: {
    fontSize: 34,
    fontWeight: 'bold',
  },
});
