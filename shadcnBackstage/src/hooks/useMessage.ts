import { toast } from '@/components/ui/toast/use-toast'

export function useMessage() {
  const defaultConfig = {
    duration: 3000
  }

  return {
    success(message: string) {
      return toast({
        title: '成功',
        description: message,
        variant: 'default',
        ...defaultConfig
      })
    },
    error(message: string) {
      return toast({
        title: '错误',
        description: message,
        variant: 'destructive',
        ...defaultConfig
      })
    },
    warning(message: string) {
      return toast({
        title: '警告',
        description: message,
        variant: 'destructive',
        ...defaultConfig
      })
    },
    info(message: string) {
      return toast({
        title: '提示',
        description: message,
        ...defaultConfig
      })
    }
  }
}

export default useMessage
