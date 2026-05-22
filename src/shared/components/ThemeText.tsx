import { cn } from "@/core/utils/cn";
import { Text, TextProps } from "react-native";


interface AppTextProps extends TextProps {
  className?: string;
}



export function ThemeText({ className, ...props }: AppTextProps) {
  return (
    <Text {...props} className={cn('font-poppinRegular',className)}/>
  )
}

