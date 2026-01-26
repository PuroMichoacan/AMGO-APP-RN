import {
  ArrowRight,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Factory,
  ShieldCheck,
  Users
} from 'lucide-react-native';
import { useState } from 'react';
import { Dimensions, Image, LayoutAnimation, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


// --- DATOS MOCK ---
const CAROUSEL_DATA = [
  { id: 1, title: 'Innovación en Acero', subtitle: 'Liderando el futuro sustentable', color: '#460a78', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'Seguridad Primero', subtitle: 'Nuestra prioridad eres tú', color: '#e63c41', img: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Operación México', subtitle: 'Eficiencia de clase mundial', color: '#f58746', img: 'https://images.unsplash.com/photo-1533035353720-f1c6a75cd8ab?auto=format&fit=crop&q=80&w=800' },
];

const MODULES_DATA = [
  {
    id: 'm1',
    title: 'Producción',
    icon: Factory,
    options: ['Estado de Hornos', 'Laminación', 'Control de Calidad', 'Inventario Materia Prima'],
  },
  {
    id: 'm2',
    title: 'Seguridad e Higiene',
    icon: ShieldCheck,
    options: ['Reportar Incidente', 'Checklist EPP', 'Protocolos Críticos', 'Capacitación'],
  },
  {
    id: 'm3',
    title: 'Recursos Humanos',
    icon: Users,
    options: ['Mis Nóminas', 'Solicitud de Vacaciones', 'Beneficios', 'Directorio'],
  },
  {
    id: 'm4',
    title: 'KPIs & Reportes',
    icon: BarChart3,
    options: ['Dashboard Mensual', 'Eficiencia Energética', 'Emisiones CO2'],
  },
];

const { width } = Dimensions.get('window');



const mainMenu = () => {

  const [expandedModule, setExpandedModule] = useState(null);
  const toggleAccordion = (id : any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedModule(expandedModule === id ? null : id);
  };

  return (

    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      
      {/* HEADER PERSONALIZADO */}
      {/* <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-gray-100">
        <View>
          <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest">Bienvenido a</Text>
          <Text className="text-[#460a78] text-2xl font-black">ArcelorMittal</Text>
        </View>
        <View className="w-10 h-10 rounded-full bg-[#be2878] items-center justify-center">
          <Settings color="white" size={20} />
        </View>
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        
        {/* CARRUSEL SPECTACULAR */}
        <View className="mt-4">
          <ScrollView 
            horizontal 
            pagingEnabled 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {CAROUSEL_DATA.map((item) => (
              <View 
                key={item.id} 
                className="mr-4 overflow-hidden rounded-3xl shadow-lg bg-white"
                style={{ width: width * 0.82, height: 200 }}
              >
                <Image source={{ uri: item.img }} className="absolute w-full h-full opacity-90" />
                <View className="flex-1 p-6 justify-end bg-black/30">
                  <Text className="text-white text-xl font-bold">{item.title}</Text>
                  <Text className="text-white/80 text-sm">{item.subtitle}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* SECCIÓN DE MÓDULOS (ACORDEÓN) */}
        <View className="px-6 mt-8 mb-10">
          <Text className="text-gray-800 text-lg font-bold mb-4">Módulos Operativos</Text>
          
          {MODULES_DATA.map((module) => {
            const isOpen = expandedModule === module.id;
            const Icon = module.icon;
            
            return (
              <View 
                key={module.id} 
                className={`mb-3 overflow-hidden rounded-2xl border ${isOpen ? 'border-[#be2878] bg-white' : 'border-gray-200 bg-white'} shadow-sm`}
              >
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => toggleAccordion(module.id)}
                  className="flex-row items-center justify-between p-5"
                >
                  <View className="flex-row items-center">
                    <View 
                      className="p-2 rounded-xl mr-4" 
                      style={{ backgroundColor: isOpen ? '#be2878' : '#f3f4f6' }}
                    >
                      <Icon size={22} color={isOpen ? 'white' : '#460a78'} />
                    </View>
                    <Text className={`text-base font-semibold ${isOpen ? 'text-[#be2878]' : 'text-gray-700'}`}>
                      {module.title}
                    </Text>
                  </View>
                  {isOpen ? <ChevronUp size={20} color="#be2878" /> : <ChevronDown size={20} color="#9ca3af" />}
                </TouchableOpacity>

                {isOpen && (
                  <View className="bg-gray-50 px-5 pb-4">
                    {module.options.map((option, index) => (
                      <TouchableOpacity 
                        key={index}
                        onPress={() => console.log(`Navegando a: ${option}`)}
                        className="flex-row items-center justify-between py-3 border-t border-gray-100"
                      >
                        <Text className="text-gray-600 text-sm font-medium">{option}</Text>
                        <ArrowRight size={16} color="#f58746" />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* FOOTER / TAB BAR MOCKUP (OPCIONAL) */}
      {/* <View className="h-16 bg-white border-t border-gray-100 flex-row justify-around items-center px-10">
        <View className="w-1 h-1 bg-[#460a78] rounded-full mt-10 absolute bottom-2" />
        <Factory color="#460a78" size={24} />
        <BarChart3 color="#9ca3af" size={24} />
        <Users color="#9ca3af" size={24} />
      </View> */}
    </SafeAreaView>
    
   
  )
}

export default mainMenu


