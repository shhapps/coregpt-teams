import * as teamsJs from '@microsoft/teams-js'

export async function initializeTeams() {
  await teamsJs.app.initialize()

  return teamsJs
}
