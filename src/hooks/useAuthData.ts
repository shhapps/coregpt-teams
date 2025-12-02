import * as teamsJs from '@microsoft/teams-js'

import { useAppStore } from '@/stores/app.store'
import { getUserData, upsertMicrosoftUser } from '@/utils/axios-utils'

export const useAuthData = () => {
  const { accessToken, userInfo, updateUserInfo, updateAccessToken, requestId } = useAppStore()

  const checkAuthState = async () => {
    // If token exists, it means user authenticated and enough to update user info
    if (accessToken && !userInfo) {
      const userData = await getUserData()
      if (userData?.email)
        updateUserInfo({
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email
        })
      return
    }

    // If not, need to get access token by upserting user
    if (!accessToken) {
      await teamsJs.app.initialize()
      const context = await teamsJs.app.getContext()
      if (context.user) {
        const [firstName, lastName] = Array.isArray(context.user.displayName?.split(' '))
          ? context.user.displayName.split(' ')
          : ['', '']

        // Update that later after auth
        const teamsUserData = {
          email: context.user.userPrincipalName || context.user.loginHint,
          first_name: firstName,
          last_name: lastName
        }

        const userData = await upsertMicrosoftUser({
          email: teamsUserData.email || `teams_${requestId}@mail.com`,
          first_name: teamsUserData.first_name,
          last_name: teamsUserData.last_name,
          request_id: requestId,
          access_token: requestId
        })
        updateAccessToken(userData.access_token)
        updateUserInfo({ email: userData.email })
      }
    }
  }

  return { checkAuthState }
}
