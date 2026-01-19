import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { Wind, MapPin, PhoneCall, AlertTriangle } from 'lucide-react-native';

const AsthmaApp = () => {
  // สมมติข้อมูล (Mock Data)
  const [aqi, setAqi] = useState(75); // ค่า AQI
  const [location, setLocation] = useState("เขตปทุมวัน, กรุงเทพฯ");

  // ฟังก์ชันเลือกสีตามระดับความอันตรายของฝุ่น
  const getAqiColor = (value) => {
    if (value <= 50) return '#4CAF50'; // ดี (เขียว)
    if (value <= 100) return '#FFC107'; // ปานกลาง (เหลือง)
    if (value <= 150) return '#FF9800'; // เริ่มมีผล (ส้ม)
    return '#F44336'; // อันตราย (แดง)
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>สวัสดีครับ,</Text>
          <Text style={styles.subGreeting}>วันนี้อากาศรอบตัวคุณเป็นอย่างไรบ้าง?</Text>
        </View>

        {/* PM 2.5 Card */}
        <View style={[styles.aqiCard, { backgroundColor: getAqiColor(aqi) }]}>
          <View style={styles.aqiInfo}>
            <Wind color="white" size={32} />
            <Text style={styles.aqiLabel}>คุณภาพอากาศ (AQI)</Text>
            <Text style={styles.aqiValue}>{aqi}</Text>
            <Text style={styles.aqiStatus}>{aqi > 100 ? 'ควรเลี่ยงกิจกรรมกลางแจ้ง' : 'อากาศดีปกติ'}</Text>
          </View>
          <View style={styles.locationTag}>
            <MapPin color="white" size={16} />
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>ความช่วยเหลือด่วน</Text>
        </View>
        
        <View style={styles.actionGrid}>
          <TouchableOpacity style={[styles.actionButton, { borderColor: '#F44336' }]}>
            <PhoneCall color="#F44336" />
            <Text style={[styles.actionText, { color: '#F44336' }]}>สายด่วน 1669</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, { borderColor: '#2196F3' }]}>
            <AlertTriangle color="#2196F3" />
            <Text style={[styles.actionText, { color: '#2196F3' }]}>แผนปฐมพยาบาล</Text>
          </TouchableOpacity>
        </View>

        {/* Nearby Pharmacy List */}
        <Text style={styles.sectionTitle}>ร้านขายยาใกล้คุณ</Text>
        
        {[1, 2].map((item) => (
          <View key={item} style={styles.pharmacyCard}>
            <View>
              <Text style={styles.pharmacyName}>ร้านขายยาฟาร์มาแคร์ {item}</Text>
              <Text style={styles.pharmacyDist}>ระยะทาง 500 เมตร • เปิดอยู่</Text>
            </View>
            <TouchableOpacity style={styles.goButton}>
              <Text style={styles.goButtonText}>ไปที่ร้าน</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  scrollContent: { padding: 20 },
  header: { marginBottom: 25 },
  greeting: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subGreeting: { fontSize: 16, color: '#666' },
  aqiCard: {
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    marginBottom: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
  },
  aqiLabel: { color: 'white', fontSize: 18, marginTop: 10 },
  aqiValue: { color: 'white', fontSize: 64, fontWeight: '900' },
  aqiStatus: { color: 'white', fontSize: 16, fontWeight: '500' },
  locationTag: { flexDirection: 'row', marginTop: 15, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', padding: 8, borderRadius: 20 },
  locationText: { color: 'white', marginLeft: 5 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  actionGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  actionButton: { flex: 0.48, borderWidth: 2, borderRadius: 15, padding: 15, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 10 },
  actionText: { fontWeight: 'bold' },
  pharmacyCard: { backgroundColor: 'white', padding: 15, borderRadius: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#EEE' },
  pharmacyName: { fontSize: 16, fontWeight: '600' },
  pharmacyDist: { fontSize: 14, color: '#888' },
  goButton: { backgroundColor: '#2196F3', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 10 },
  goButtonText: { color: 'white', fontWeight: 'bold' }
});

export default AsthmaApp;