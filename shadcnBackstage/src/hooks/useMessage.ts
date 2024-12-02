import { useToast } from '@/components/ui/toast/use-toast'

export const useMessage = () => {
  const { toast } = useToast()

  return {
    success(content: string) {
      toast({
        title: '成功',
        description: content,
        variant: 'default'
      })
    },

    error(content: string) {
      toast({
        title: '错误',
        description: content,
        variant: 'destructive'
      })
    },

    warning(content: string) {
      toast({
        title: '警告',
        description: content,
        variant: 'default'
      })
    }
  }
}
