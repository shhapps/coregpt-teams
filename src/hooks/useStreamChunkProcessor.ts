import { getUsageMatch } from '@/utils/global'

export const useStreamChunkProcessor = () => {
  const processNonPromiseChunkStream = (chunk: string, processAnswerChunk: (chunk: string) => void) => {
    const usageMatch = getUsageMatch(chunk)
    if (usageMatch) {
      const [fullMatch, usageBase64] = usageMatch
      const contentBeforeUsage = chunk.replace(fullMatch, '')
      if (contentBeforeUsage) processAnswerChunk(contentBeforeUsage)
      const usageJson = atob(usageBase64)
      const usageInfoData = JSON.parse(usageJson)
      void usageInfoData
    } else processAnswerChunk(chunk)
  }

  return { processNonPromiseChunkStream: processNonPromiseChunkStream }
}
