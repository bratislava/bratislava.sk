import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  Typography,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  EmptyStateLayout,
} from '@strapi/design-system'
import { useFetchClient, useNotification } from '@strapi/strapi/admin'
import { Link } from 'react-router-dom'

interface Page {
  id: number
  documentId: string
  title: string
  locale?: string
}

interface Component {
  category: string
  name: string
  displayName: string
}

const PagesByComponent = () => {
  const [components, setComponents] = useState<Component[]>([])
  const [selectedComponent, setSelectedComponent] = useState<string>('')
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(false)
  const { get } = useFetchClient()
  const { toggleNotification } = useNotification()

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const { data } = await get('/api/pages-by-component/components')
        setComponents(data?.components || [])
      } catch (error: any) {
        toggleNotification({
          type: 'danger',
          message: `Failed to load components: ${
            error?.response?.data?.error?.message || error?.message || 'Unknown error'
          }`,
        })
      }
    }
    fetchComponents()
  }, [get, toggleNotification])

  const handleSearch = async () => {
    if (!selectedComponent) {
      toggleNotification({
        type: 'warning',
        message: 'Please select a component first',
      })
      return
    }

    setLoading(true)
    try {
      const { data } = await get(
        `/api/pages-by-component/pages?component=${encodeURIComponent(selectedComponent)}`
      )
      const fetchedPages = data?.pages || []
      setPages(fetchedPages)

      if (fetchedPages.length === 0) {
        toggleNotification({
          type: 'info',
          message: 'No pages found with this component',
        })
      }
    } catch (error: any) {
      toggleNotification({
        type: 'danger',
        message: `Failed to fetch pages: ${error?.message || 'Unknown error'}`,
      })
    } finally {
      setLoading(false)
    }
  }

  const getContentManagerUrl = (page: Page) =>
    `/admin/content-manager/collection-types/api::page.page/${page.documentId}`

  return (
    <Box padding={8}>
      <Flex direction="column" gap={4}>
        <Typography variant="alpha">Pages by Component</Typography>
        <Typography variant="omega" textColor="neutral600">
          Find all pages that use a specific component in their sections field
        </Typography>

        <Flex gap={3} alignItems="end">
          <Box style={{ flex: 1 }}>
            <Typography variant="pi" fontWeight="semiBold" marginBottom={2}>
              Select Component
            </Typography>
            <select
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #dcdce4',
                borderRadius: '4px',
                fontSize: '14px',
                backgroundColor: 'white',
              }}
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value)}
            >
              <option value="">Choose a component...</option>
              {components.map((component) => (
                <option
                  key={`${component.category}.${component.name}`}
                  value={`${component.category}.${component.name}`}
                >
                  {component.displayName}
                </option>
              ))}
            </select>
          </Box>
          <Button onClick={handleSearch} loading={loading} disabled={!selectedComponent}>
            Search
          </Button>
        </Flex>

        {pages.length > 0 && (
          <Box>
            <Typography variant="beta" marginBottom={4}>
              Found {pages.length} page{pages.length !== 1 ? 's' : ''}
            </Typography>
            <Table colCount={3} rowCount={pages.length}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">Title</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Locale</Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">Actions</Typography>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {pages.map((page) => (
                  <Tr key={page.documentId}>
                    <Td>
                      <Typography>{page.title || 'Untitled'}</Typography>
                    </Td>
                    <Td>
                      <Typography>{page.locale || 'N/A'}</Typography>
                    </Td>
                    <Td>
                      <Link to={getContentManagerUrl(page)}>Open in Content Manager</Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}

        {pages.length === 0 && selectedComponent && !loading && (
          <EmptyStateLayout
            content="No pages found with the selected component"
            action={
              <Button variant="secondary" onClick={() => setSelectedComponent('')}>
                Clear selection
              </Button>
            }
          />
        )}
      </Flex>
    </Box>
  )
}

export default PagesByComponent
