import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {Text, View, Card, TouchableOpacity, Incubator} from 'react-native-ui-lib';
import Constants from 'expo-constants';
import * as Application from 'expo-application';
import {If} from '@kanzitelli/if-component';
import {observer} from 'mobx-react';
import {NavioScreen} from 'rn-navio';

import {services, useServices} from '@app/services';
import {useStores} from '@app/stores';
import {Section} from '@app/components/section';
import {BButton, HeaderButton} from '@app/components/button';
import {Reanimated2} from '@app/components/reanimated2';
import {Row} from '@app/components/row';
import {useAppearance} from '@app/utils/hooks';
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SwipeButton from 'rn-swipe-button';
import dayjs from 'dayjs';

const {Toast} = Incubator;

const ThumbIcon = () => (
  <View style={styles.thumbIcon}>
    <AntDesign name="arrowright" size={20} color="#0078D7" />
  </View>
);

export const Home: NavioScreen = observer(({}) => {
  useAppearance();
  const {counter, ui} = useStores();
  const {t, api, navio} = useServices();
  const navigation = navio.useN();

  // State (local)
  const [loading, setLoading] = useState(false);
  const [swipeStatusMessage, setSwipeStatusMessage] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("Robert");
  const [lastName, setLastName] = useState<string>("Allen");
  const [role, setRole] = useState<string>("Lead UI/UX Designer");
  const [greeting, setGreeting] = useState<string>("");
  const [workingHourStart, setWorkingHourStart] = useState<string>("08:00");
  const [workingHourEnd, setWorkingHourEnd] = useState<string>("08:59");
  const [breakTime, setBreakTime] = useState<string>("01:00");
  const [totalDays, setTotalDays] = useState(28);
  const [checkIn, setCheckIn] = useState<string | null>();
  const [checkOut, setCheckOut] = useState<string | null>();
  const [status, setStatus] = useState<string>("Late");
  const [isCheckedIn, setIsCheckedIn] = useState<boolean>(false);
  const [isCheckedOut, setIsCheckedOut] = useState<boolean>(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  
  const fullName = firstName + ' ' + lastName;
  const currentDate = dayjs().format('dddd, MMMM D, YYYY');

  const updateSwipeStatusMessage = (message: string) => setSwipeStatusMessage(message);

  // Start
  useEffect(() => {
    setGreeting(getGreeting());
    isTimeToCheckOut();
  }, []);

  const handleCheckIn = () => {
    const currentTime = dayjs().format('HH:mm');
    setCheckIn(currentTime);
    console.log("Checked in successfully!");
    updateSwipeStatusMessage("Checked in successfully!");
    setIsCheckedIn(true);
    setIsCheckedOut(false);
    setToastVisible(true);
    resetTimer();
    startTimer();
    setTimeout(() => {
      setToastVisible(false);
      updateSwipeStatusMessage("");
    }, 1000);
  };

  const handleCheckOut = () => {
    const currentTime = dayjs().format('HH:mm');
    setCheckOut(currentTime);
    console.log("Checked out successfully!");
    updateSwipeStatusMessage("Checked out successfully!");
    setIsCheckedIn(false);
    setIsCheckedOut(true);
    setToastVisible(true);
    resetTimer();
    if (intervalId) clearInterval(intervalId);
    setTimeout(() => {
      setToastVisible(false);
      updateSwipeStatusMessage("");
    }, 1000);
  };

  const getGreeting = () => {
    const hour = dayjs().hour();
    if (hour >= 12 && hour < 18) {
      return "Good Afternoon";
    } else if (hour >= 18 || hour < 6) {
      return 'Good Evening';
    }
    return 'Good Morning';
  };

  const resetTimer = () => {
    if (intervalId) clearInterval(intervalId);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIntervalId(null);
  };
  
  const startTimer = () => {
    if (intervalId) return; // Prevent starting multiple timers

    const id = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 59) {
          setMinutes((prev) => {
            if (prev === 59) {
              setHours((prev) => prev + 1);
              return 0;
            }
            return prev + 1;
          });
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    setIntervalId(id);
  };

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  const isTimeToCheckOut = () => {
    const currentTime = dayjs();
    const workingEndTime = dayjs().set('hour', parseInt(workingHourEnd.split(':')[0], 10)).set('minute', parseInt(workingHourEnd.split(':')[1], 10));
    return currentTime.isAfter(workingEndTime.subtract(5, 'minute'));
  };

  const shouldShowCheckOutButton = isCheckedIn && isTimeToCheckOut();
  const shouldShowCheckInButton = !isCheckedIn;

  const buttonTitle = shouldShowCheckOutButton ? "Swipe to Check Out" : "Swipe to Check In";
  const buttonColor = shouldShowCheckOutButton ? "#FF3548" : "#0078D7";
  const buttonAction = shouldShowCheckOutButton ? handleCheckOut : handleCheckIn;

  return (
    <View flex bg-bgColor style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <View>
          {/* Profile */}
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={require('../../assets/avatar.png')}
              contentFit="contain"
            />
            <View style={styles.textContainer}>
              <Text text65>{fullName}</Text>
              <Text text80>{role}</Text>
            </View>
          </View>
          {/* Profile */}

          {/* Greetings Card */}
          {!isCheckedIn && (
            <Card style={styles.greetingsCard}>
              <View style={styles.cardContent}>
                <Text style={styles.cardText} text65>Hello {lastName} 👋🏻</Text>
                <Text style={styles.cardText} text80>{greeting}! Now it's {currentDate}.</Text>
              </View>
            </Card>
          )}
          {/* Greetings Card */}

          {/* Up Timer Card */}
          { isCheckedIn && (
            <Card style={styles.upTimerCard}>
              <View style={styles.timerContainer}>
                <View style={styles.timerBox}>
                  <Text style={styles.timerText}>{String(hours).padStart(2, '0')}</Text>
                  <Text style={styles.timerLabel}>Hour</Text>
                </View>
                <View style={styles.timerBox}>
                  <Text style={styles.timerText}>{String(minutes).padStart(2, '0')}</Text>
                  <Text style={styles.timerLabel}>Minute</Text>
                </View>
                <View style={styles.timerBox}>
                  <Text style={styles.timerText}>{String(seconds).padStart(2, '0')}</Text>
                  <Text style={styles.timerLabel}>Second</Text>
                </View>
              </View>
            </Card>
          )}
          {/* Up Timer Card */}

          {/* Today Attendance */}
          <Text text65 style={styles.title}>Today Attendance</Text>
          <View style={styles.grid}>
            <Card style={styles.gridItem}>
              <View>
                <View style={styles.header}>
                  <MaterialIcons name="login" size={20} color="#0078D7"/>
                  <Text style={styles.todayAttendanceTitle} text80>Check In</Text>
                </View>
                <View style={styles.todayAttendanceSubTitle}>
                  <Text text65>{workingHourStart}</Text>
                  <Text text80>On Time</Text>
                </View>
              </View>
            </Card>
            <Card style={styles.gridItem}>
              <View>
                <View style={styles.header}>
                  <MaterialIcons name="logout" size={20} color="#0078D7"/>
                  <Text style={styles.todayAttendanceTitle} text80>Check Out</Text>
                </View>
                <View style={styles.todayAttendanceSubTitle}>
                  <Text text65>{workingHourEnd}</Text>
                  <Text text80>Go Home</Text>
                </View>
              </View>
            </Card>
            <Card style={styles.gridItem}>
              <View>
                <View style={styles.header}>
                  <Ionicons name="alarm-outline" size={22} color="#0078D7"/>
                  <Text style={styles.todayAttendanceTitle} text80>Break Time</Text>
                </View>
                <View style={styles.todayAttendanceSubTitle}>
                  <Text text65>{breakTime} Hours</Text>
                  <Text text80></Text>
                </View>
              </View>
            </Card>
            <Card style={styles.gridItem}>
              <View>
                <View style={styles.header}>
                  <Entypo name="calendar" size={20} color="#0078D7"/>
                  <Text style={styles.todayAttendanceTitle} text80>Total Days</Text>
                </View>
                <View style={styles.todayAttendanceSubTitle}>
                  <Text text65>{totalDays}</Text>
                  <Text text80>Working Days</Text>
                </View>
              </View>
            </Card>
          </View>
          {/* Today Attendance */}
          
          {/* Your Activity */}
          <View style={styles.activityHeader}>
            <Text text65 style={styles.title}>Your Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ActivityScreen')}>
              <Text text85 style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {(isCheckedIn || isCheckedOut) && (
            <Card style={styles.activityCard}>
              <View style={styles.activityCardContent}>
                <MaterialIcons name="login" size={33} color="#0078D7"/>
                <View style={styles.activityTextContainer}>
                  <Text text65>Check In</Text>
                  <Text text80>{currentDate}</Text>
                </View>
                <View style={styles.activityTimeContainer}>
                  <Text text65>{checkIn}</Text>
                  <Text text80>{status}</Text>
                </View>
              </View>
            </Card>
          )}
          {isCheckedOut && (
            <Card style={styles.activityCard}>
              <View style={styles.activityCardContent}>
                <MaterialIcons name="logout" size={33} color="#0078D7"/>
                <View style={styles.activityTextContainer}>
                  <Text text65>Check Out</Text>
                  <Text text80>{currentDate}</Text>
                </View>
                <View style={styles.activityTimeContainer}>
                  <Text text65>{checkOut}</Text>
                </View>
              </View>
            </Card>
          )}
          {/* Your Activity */}

          <Text style={styles.swipeStatus}>{swipeStatusMessage}</Text>
        </View>
      </ScrollView>
      {/* Swipe to Check In/Out */}
      {(shouldShowCheckInButton || shouldShowCheckOutButton) && (
        <SwipeButton
          onSwipeSuccess={buttonAction}
          swipeSuccessThreshold={100}
          title={buttonTitle}
          height={65}
          thumbIconBackgroundColor="#FFFFFF"
          thumbIconBorderColor={buttonColor}
          railBackgroundColor={buttonColor}
          railBorderColor={buttonColor}
          railFillBackgroundColor="#FFFFFF"
          railFillBorderColor="#FFFFFF"
          shouldResetAfterSuccess={true}
          containerStyles={styles.swipeButtonContainer}
          titleStyles={styles.swipeButtonTitle}
          thumbIconComponent={ThumbIcon}
        />
      )}
      {/* Swipe to Check In/Out */}

      {/* Toast */}
      <Toast
        visible={toastVisible}
        position={'top'}
        autoDismiss={5000}
        onDismiss={() => setToastVisible(false)}
        message={swipeStatusMessage}
        preset="success"
        centerMessage
      />
      {/* Toast */}
    </View>
  );
});
Home.options = () => ({
  title: services.t.do('home.title'),
});

const styles = StyleSheet.create({
  container: {
    margin: 30,
    paddingTop: 45,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  todayAttendanceCard: {
    padding: 5,
    borderRadius: 8,
    paddingVertical: 15,
  },
  title: {
    marginBottom: 7,
    marginTop: 16,
  },
  todayAttendanceTitle: {
    marginLeft: 10,
  },
  todayAttendanceSubTitle: {
    marginVertical: 10,
  },
  greetingsCard: {
    paddingTop: 10,
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 120, 215, 0.1)',
  },
  cardContent: {
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  cardText: {
    color: 'black',
  },
  image: {
    width: 55,
    height: '100%',
  },
  textContainer: {
    marginLeft: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    color: '#0078D7',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  activityCard: {
    marginBottom: 10,
  },
  activityCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  activityTextContainer: {
    marginLeft: 10,
  },
  activityTimeContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  swipeButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    transform: [{ translateX: -5 }],
    width: '100%', 
    borderRadius: 50,
    backgroundColor: "#0078D7"
  },
  swipeButtonTitle: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  swipeStatus: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 16,
    color: '#0078D7',
  },
  thumbIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  upTimerCard: {
    paddingTop: 10,
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(35, 189, 51, 0.5)',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  timerBox: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 65,
    height: 65,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timerLabel: {
    fontSize: 12,
    color: '#555',
  },
});