import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
type Etudiant = {
id: string;
nom: string;
filiere: string;
note: number;
};
const etudiants: Etudiant[] = [
 { id: 'e1', nom: 'Amine', filiere: 'IAIL S5', note: 14 },
 { id: 'e2', nom: 'Sara', filiere: 'IAIL S5', note: 12 },
 { id: 'e3', nom: 'Lina', filiere: 'IAIL S5', note: 16 },
 { id: 'e4', nom: 'Youssef', filiere: 'IAIL S5', note: 11 },
];
type BadgeProps = { note: number };
function BadgeStatut({ note }: BadgeProps) {
const admis = note >= 10;
 return (
 <View style={[styles.badge,admis ? styles.badgeAdmis : styles.badgeAjourne]}>
 <Text style={styles.texteBadge}>{admis ? 'Admis' : 'Ajourné'}</Text>
 </View>
 );
}
type CarteProps = { etudiant: Etudiant };
function CarteEtudiant({ etudiant }: CarteProps) {
const { nom, filiere, note } = etudiant;
return (
<View style={styles.carte}>
<View style={styles.enteteCarte}>
<Text style={styles.nom}>{nom}</Text>
<BadgeStatut note={note} />
</View>
<Text style={styles.information}>Filière : {filiere}</Text>
<Text style={styles.information}>Note : {note}/20</Text>
</View>
);
}
const styles = StyleSheet.create({
information: {
  color: '#3D4A5C',
  marginTop: 3,
},

badge: {
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 10,
  marginLeft: 8,
},

badgeAdmis: {
  backgroundColor: '#D6F5E7',
},

badgeAjourne: {
  backgroundColor: '#FFE5E5',
},

texteBadge: {
  fontSize: 12,
  color: '#00235C',
  fontWeight: 'bold',
},  
page: { 
  paddingTop: 56, 
  paddingHorizontal: 18,
  paddingBottom: 30, 
  backgroundColor: '#F2F7FD', 
  flexGrow: 1 
},
carte: { 
  padding: 16, 
  backgroundColor: '#FFFFFF',
  borderRadius: 12, 
  marginBottom: 12 
},
enteteCarte: { 
  flexDirection: 'row', 
  alignItems: 'center',
  justifyContent: 'space-between', 
  marginBottom: 8 
},
nom: { 
  fontSize: 18, 
  fontWeight: 'bold', 
  color: '#00235C' 
},
titre: {
  fontSize: 27,
  fontWeight: 'bold',
  color: '#00235C',
},

sousTitre: {
  fontSize: 15,
  color: '#4C5360',
  marginTop: 5,
  marginBottom: 18,
},

resume: {
  padding: 16,
  borderRadius: 12,
  backgroundColor: '#DCEBFF',
  marginBottom: 18,
  gap: 5,
},

texteResume: {
  color: '#00235C',
  fontWeight: '600',
  fontSize: 16,
},
});
export default function App() {
  const nombreAdmis = etudiants.filter(e => e.note >= 10).length;
  const total = etudiants.reduce((somme, e) => somme + e.note, 0);
  const moyenne = (total / etudiants.length).toFixed(1).replace('.', ',');
  return (
  <ScrollView contentContainerStyle={styles.page}>
    <Text style={styles.titre}>CampusCards</Text>
    <Text style={styles.sousTitre}>Mes étudiants - IAIL S5</Text>
    <View style={styles.resume}>
      <Text style={styles.texteResume}>Admis : {nombreAdmis} / {etudiants.length}</Text>
      <Text style={styles.texteResume}>Moyenne : {moyenne}/20</Text>
    </View>
    {etudiants.map(etudiant => (
      <CarteEtudiant
        key={etudiant.id}
        etudiant={etudiant}/>
    ))}
  </ScrollView>
);
}