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
  // Safe default mapping if navigation parameters aren't passed yet
  const destination = route?.params?.destination || {
    title: 'Volcanoes National Park',
    location: 'Musanze, Northern Province',
    price: '$1,500',
    rating: '4.9',
    image: 'https://unsplash.com',
  };

  // State maps for handling accordion expansions
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* --- Hero Image Header Background Component --- */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: destination.image }} style={styles.heroImage} />
          
          {/* Top Sticky Header Overlay */}
          <View style={styles.navOverlay}>
            <TouchableOpacity style={styles.roundButton} onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back" size={22} color="#1E2220" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.roundButton}>
              <Ionicons name="heart-outline" size={22} color="#1E2220" />
            </TouchableOpacity>
          </View>
        </View>

        {/* --- Core Details Title Content --- */}
        <View style={styles.detailsContent}>
          <View style={styles.titleRow}>
            <Text style={styles.destinationTitle}>{destination.title}</Text>
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#E0A928" />
              <Text style={styles.ratingText}>{destination.rating}</Text>
            </View>
          </View>

          <div style={styles.locationRow}>
            <Ionicons name="location-sharp" size={14} color="#666" style={{ marginRight: 4 }} />
            <Text style={styles.locationText}>{destination.location}</Text>
          </div>

          {/* --- Segmented Interactive Accordions (Replaces Template Heavy Text) --- */}
          
          {/* Accordion 1: Overview */}
          <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('overview')}>
            <Text style={styles.accordionTitle}>Experience Overview</Text>
            <Ionicons 
              name={expandedSection === 'overview' ? 'chevron-up' : 'chevron-down'} 
              size={18} 
              color="#113F26" 
            />
          </TouchableOpacity>
          {expandedSection === 'overview' && (
            <View style={styles.accordionBody}>
              <Text style={styles.bodyText}>
                Track the majestic and rare mountain gorillas through the dense bamboo forests of the Virunga Massif. Led by expert national park rangers, this trek brings you face-to-face with wildlife while supporting critical habitat preservation efforts in Rwanda.
              </Text>
            </View>
          )}

          {/* Accordion 2: Included Perks & Facilities */}
          <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('perks')}>
            <Text style={styles.accordionTitle}>What's Included</Text>
            <Ionicons 
              name={expandedSection === 'perks' ? 'chevron-up' : 'chevron-down'} 
              size={18} 
              color="#113F26" 
            />
          </TouchableOpacity>
          {expandedSection === 'perks' && (
            <View style={styles.accordionBody}>
              <View style={styles.perksGrid}>
                <View style={styles.perksItem}><Text>🦧 Ranger Escort</Text></View>
                <View style={styles.perksItem}><Text>🎟️ Entry Permit</Text></View>
                <View style={styles.perksItem}><Text>🚙 4x4 Transit</Text></View>
                <View style={styles.perksItem}><Text>💧 Bottled Water</Text></View>
              </View>
            </View>
          )}

          {/* Accordion 3: Essential Guidelines */}
          <TouchableOpacity style={styles.accordionHeader} onPress={() => toggleSection('rules')}>
            <Text style={styles.accordionTitle}>Safety & Packing Guidelines</Text>
            <Ionicons 
              name={expandedSection === 'rules' ? 'chevron-up' : 'chevron-down'} 
              size={18} 
              color="#113F26" 
            />
          </TouchableOpacity>
          {expandedSection === 'rules' && (
            <View style={styles.accordionBody}>
              <Text style={styles.bodyText}>
                • Sturdy waterproof hiking boots are required.{"\n"}
                • Bring long pants and long-sleeve shirts to protect against brush.{"\n"}
                • Maintain a strict 7-meter distance from the primates at all times.
              </Text>
            </View>
          )}

        </View>
      </ScrollView>

      {/* --- Static Bottom Navigation Booking Utility Anchor Bar --- */}
      <View style={styles.bookingFooter}>
        <View>
          <Text style={styles.footerPriceLabel}>Estimated Cost</Text>
          <Text style={styles.footerPriceAmount}>{destination.price}<Text style={styles.footerPriceSub}> /person</Text></Text>
        </View>
        <TouchableOpacity 
          style={styles.primaryCTAButton}
          onPress={() => navigation.navigate('GuideSearch')}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryCTAButtonText}>Find Local Guides</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFF" style={{ marginLeft: 6 }} />
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F8',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 320,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  navOverlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContent: {
    backgroundColor: '#F7F9F8',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 100,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  destinationTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E2220',
    flex: 1,
    paddingRight: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    elevation: 1,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1E2220',
    marginLeft: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 1,
  },
  accordionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1E2220',
  },
  accordionBody: {
    backgroundColor: '#FFF',
    paddingHorizontal: 18,
    paddingBottom: 16,
    marginTop: -16,
    marginBottom: 12,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    elevation: 1,
  },
  bodyText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  perksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  perksItem: {
    width: '48%',
    backgroundColor: '#F7F9F8',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  bookingFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#ECEFF0',
  },
  footerPriceLabel: {
    fontSize: 11,
    color: '#666',
    textTransform: 'uppercase',
  },
  footerPriceAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#113F26',
  },
  footerPriceSub: {
    fontSize: 12,
    fontWeight: '400',
    color: '#666',
  },
  primaryCTAButton: {
    backgroundColor: '#113F26',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
  },
  primaryCTAButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
});
