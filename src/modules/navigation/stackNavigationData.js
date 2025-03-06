import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

import TabNavigator from './MainTabNavigator';
import GalleryScreen from '../gallery/GalleryViewContainer';
import PartnerInfoView from '../partners/PartnerInfoView';
import FAQInfoView from '../faq/FAQInfoView';
import FFSInfoView from '../ffs/FfsInfoView';
import SpeakerDetailsView from '../speakers/SpeakerDetails'
import TicketsView from '../tickets/TicketsView'

import { colors, fonts } from '../../styles';

const headerLeftComponent = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Image
        source={require('../../../assets/images/icons/arrow-back3x.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>    
  )
}

const headerBackground = require('../../../assets/images/background.png');

const StackNavigationData = [
  {
    name: 'MFMS',
    component: TabNavigator,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitle: () => (
      <Image
        source={require('../../../assets/images/transparent_black.png')} 
        style={{
          height: 55, 
          width: 55, 
          resizeMode: 'contain',
        }}
      />
    ),
  },
  {
    name: 'Partners',
    component: PartnerInfoView,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'FFS',
    component: FFSInfoView,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'FAQ',
    component: FAQInfoView,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'SpeakerDetails',
    component: SpeakerDetailsView,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'TicketsView',
    component: TicketsView,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  }
  
]

export default StackNavigationData;
