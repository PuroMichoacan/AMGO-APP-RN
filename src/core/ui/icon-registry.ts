import { Ionicons, MaterialIcons, Feather,FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { ComponentProps } from 'react';


// type IconProps =
//   | ComponentProps<typeof Ionicons>
//   | ComponentProps<typeof MaterialIcons>
//   | ComponentProps<typeof Feather>
//   | ComponentProps<typeof FontAwesome5>
//   | ComponentProps<typeof MaterialCommunityIcons>;

  
// export const IconRegistry = {
//   home: (props: ComponentProps<typeof Ionicons>) => (
//     <Ionicons name="home" {...props} />
//   ),

//   settings: (props: ComponentProps<typeof Ionicons>) => (
//     <Ionicons name="settings" {...props} />
//   ),

//   user: (props: ComponentProps<typeof Feather>) => (
//     <Feather name="user" {...props} />
//   ),

//   dashboard: (props: ComponentProps<typeof MaterialIcons>) => (
//     <MaterialIcons name="dashboard" {...props} />
//   ),

//   warehouse: (props: ComponentProps<typeof FontAwesome5>) => (
//     <FontAwesome5 name="warehouse" {...props} />
//   ),

//   draft_orders: (props: ComponentProps<typeof MaterialCommunityIcons>) => (
//     <MaterialCommunityIcons
//       name="file-document-outline"
//       {...props}
//     />
//   ),
// };


export const IconRegistry = {
  home: (props : string) => <Ionicons name="home" {...props} />,
  settings: (props : string) => <Ionicons name="settings" {...props} />,
  user: (props : string) => <Feather name="user" {...props} />,
  dashboard: (props : string) => <MaterialIcons name='dashboard' {...props} />,
  warehouse:(props : string) => <FontAwesome5 name='warehouse' {...props}/>,
  draft_orders :(props:string) => <MaterialIcons name='draft_orders' {...props}/>
}
