import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo'
import type { NavigationProps } from '@keystone-6/core/admin-ui/components'
import {
  ListNavItems,
  NavItem,
  NavigationContainer,
} from '@keystone-6/core/admin-ui/components'
import { RoleEnum } from '../../lists/utils/access-control-list'

export function CustomNavigation({
  authenticatedItem,
  lists,
}: NavigationProps) {
  const isAuthenticated = authenticatedItem.state === 'authenticated'

  const { data, loading, error } = useQuery(
    gql`
      query ($where: ReporterSystemUserWhereUniqueInput!) {
        reporterSystemUser(where: $where) {
          id
          name
          role
        }
      }
    `,
    {
      variables: {
        where: { id: isAuthenticated ? authenticatedItem.id : null },
      },
      skip: !isAuthenticated,
    }
  )

  if (loading) {
    return (
      <NavigationContainer authenticatedItem={authenticatedItem}>
        <div>Loading navigation...</div>
      </NavigationContainer>
    )
  }

  if (error) {
    return (
      <NavigationContainer authenticatedItem={authenticatedItem}>
        <div>Unable to load navigation. Please try refreshing the page.</div>
      </NavigationContainer>
    )
  }

  const userRole = isAuthenticated ? data?.reporterSystemUser?.role : null

  const NAV_ITEMS = [
    {
      path: '/latest',
      label: 'Latests',
      allowedRoles: [
        RoleEnum.Owner,
        RoleEnum.Admin,
        RoleEnum.Editor,
        RoleEnum.Contributor,
      ],
    },
    {
      path: '/review',
      label: 'Reviews',
      allowedRoles: [
        RoleEnum.Owner,
        RoleEnum.Admin,
        RoleEnum.Editor,
        RoleEnum.Contributor,
      ],
    },
  ]

  const hasAccess = (allowedRoles: string[]) =>
    isAuthenticated && userRole && allowedRoles.includes(userRole)

  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <NavItem href="/">Dashboard</NavItem>
      <ListNavItems lists={lists} />
      {NAV_ITEMS.map(({ path, label, allowedRoles }) =>
        hasAccess(allowedRoles) ? (
          <NavItem key={path} href={path}>
            {label}
          </NavItem>
        ) : null
      )}
    </NavigationContainer>
  )
}
