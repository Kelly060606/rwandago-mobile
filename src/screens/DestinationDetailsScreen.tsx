import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DestinationDetailsScreen({ route, navigation }: any) {
  const destination = route?.params?.destination || {
    title: 'Volcanoes National Park',
    location: 'Musanze, Northern Province',
    price: '$1,500',
    rating: '4.9',
    image: 'https://unsplash.com',
  };

  const [activeTab, setActiveTab] = useState<'rundown' | 'meeting' | 'facilities'>('rundown');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: destination.image }} style={styles.heroImage} />
          <View style={styles.navOverlay}>
            <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={22} color="#1E2220" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundButton}>
              <Ionicons name="heart-outline" size={22} color="#1E2220" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailsContent}>
          <View style={styles.titleRow}>
            <Text style={styles.destinationTitle}>{destination.title}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#E0A928" />
              <Text style={styles.ratingText}>{destination.rating}</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={14} color="#666" style={{ marginRight: 4 }} />
            <Text style={styles.locationText}>{destination.location}</Text>
          </View>

          <Text style={styles.descriptionText}>
            Track mountain gorillas through the dense bamboo forests of the Virunga Massif. Led by expert national park rangers, this trek supports critical ecosystem protection in Rwanda.
          </Text>

          <View style={styles.tabSelectorBar}>
            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'rundown' && styles.activeTabButton]} 
              onPress={() => setActiveTab('rundown')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'rundown' && styles.activeTabButtonText]}>Rundown</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'meeting' && styles.activeTabButton]} 
              onPress={() => setActiveTab('meeting')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'meeting' && styles.activeTabButtonText]}>Meeting Point</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabButton, activeTab === 'facilities' && styles.activeTabButton]} 
              onPress={() => setActiveTab('facilities')}
            >
              <Text style={[styles.tabButtonText, activeTab === 'facilities' && styles.activeTabButtonText]}>Facilities</Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'rundown' && (
            <View style={styles.tabContentContainer}>
              <Text style={styles.helperNotice}>
                * Departure date must confirm the relevant admin if there is a schedule cancellation.
              </Text>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineStepNumber}>1. Kinigi Basecamp (Briefing)</Text>
                <Text style={styles.timelineDescription}>Located at the park entry. Hikers register and meet their ranger guide group.</Text>
              </View>
              <View style={styles.timelineItem}>
                <Text style={styles.timelineStepNumber}>2. Bamboo Forest Perimeter Trail</Text>
                <Text style={styles.timelineDescription}>The path starts slightly uphill with dirt trail conditions. The terrain is thick with bamboo brush.</Text>
              </View>
            </View>
          )}

          {activeTab === 'meeting' && (
            <View style={styles.tabContentContainer}>
              <Text style={styles.bodyText}>
                For the meeting point, try to coordinate with the relevant admin so that there is no miss communication due to the wrong pick-up location. Transit shuttles typically gather at designated hub spots early in the morning.
              </Text>
            </View>
          )}

          {activeTab === 'facilities' && (
            <View style={styles.tabContentContainer}>
              <View style={styles.facilitiesGrid}>
                <View style={styles.facilityItem}>
                  <Ionicons name="bed-outline" size={20} color="#113F26" />
                  <Text style={styles.facilityText}>Eco Lodge Bed</Text>
                </View>
                <View style={styles.facilityItem}>
                  <Ionicons name="cafe-outline" size={20} color="#113F26" />
                  <Text style={styles.facilityText}>Breakfast Inc.</Text>
                </View>
                <View style={styles.facilityItem}>
                  <Ionicons name="shield-checkmark-outline" size={20} color="#113F26" />
                  <Text style={styles.facilityText}>Ranger Security</Text>
                </View>
              </View>
            </View>
          )}

        </View>
      </ScrollView>

      <View style={styles.bookingFooter}>
        <View>
          <Text style={styles.footerPriceLabel}>Cost Estimate</Text>
          <Text style={styles.footerPriceAmount}>{destination.price}<Text style={styles.footerPriceSub}> /person</Text></Text>
        </View>
        <TouchableOpacity 
          style={styles.primaryCTAButton}
          onPress={() => navigation.navigate('GuideSearch')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryCTAButtonText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F9F8' },
  imageContainer: { position: 'relative', width: '100%', height: 320 },
  heroImage: { width: '100%', height: '100%' },
  navOverlay: { position: 'absolute', top: 50, left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  roundButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255, 255, 255, 0.9)', justifyContent: 'center', alignItems: 'center' },
  detailsContent: { backgroundColor: '#F7F9F8', borderTopLeftRadius: 30, borderTopRightRadius: 30, marginTop: -30, paddingHorizontal: 20, paddingTop: 28, paddingBottom: 120 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  destinationTitle: { fontSize: 20, fontWeight: '700', color: '#1E2220', flex: 1, paddingRight: 10 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, elevation: 1 },
  ratingText: { fontSize: 13, fontWeight: '700', color: '#1E2220', marginLeft: 4 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  locationText: { fontSize: 14, color: '#666' },
  descriptionText: { fontSize: 13, color: '#666', lineHeight: 20, marginBottom: 20 },
  tabSelectorBar: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF', borderRadius: 12, padding: 4, marginBottom: 18, elevation: 1 },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  activeTabButton: { backgroundColor: '#113F26' },
  tabButtonText: { fontSize: 12, fontWeight: '600', color: '#666' },
  activeTabButtonText: { color: '#FFF' },
  tabContentContainer: { backgroundColor: '#FFF', borderRadius: 16, padding: 16, elevation: 1 },
  bodyText: { fontSize: 13, color: '#555', lineHeight: 22 },
  helperNotice: { fontSize: 11, fontWeight: '600', color: '#A04040', marginBottom: 14, lineHeight: 16 },
  timelineItem: { borderLeftWidth: 2, borderLeftColor: '#113F26', paddingLeft: 12, marginBottom: 14 },
  timelineStepNumber: { fontSize: 13, fontWeight: '700', color: '#1E2220', marginBottom: 2 },
  timelineDescription: { fontSize: 12, color: '#666', lineHeight: 18 },
  facilitiesGrid: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 4 },
  facilityItem: { alignItems: 'center', flex: 1 },
  facilityText: { fontSize: 11, color: '#444', fontWeight: '500', marginTop: 4 },
  bookingFooter: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#FFF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, borderTopWidth: 1, borderTopColor: '#ECEFF0' },
  footerPriceLabel: { fontSize: 11, color: '#666', textTransform: 'uppercase' },
  footerPriceAmount: { fontSize: 20, fontWeight: '700', color: '#113F26' },
  footerPriceSub: { fontSize: 12, fontWeight: '400', color: '#666' },
  primaryCTAButton: { backgroundColor: '#113F26', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 14 },
  primaryCTAButtonText: { color: '#FFF', fontSize: 15, fontWeight: '600' },
});
