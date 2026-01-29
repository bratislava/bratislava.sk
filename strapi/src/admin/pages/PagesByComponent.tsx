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
  IconButton,
} from '@strapi/design-system'
import { ChevronLeft, ChevronRight } from '@strapi/icons'
import { useFetchClient, useNotification } from '@strapi/strapi/admin'
import { Link } from 'react-router-dom'

interface Page {
  id: number
  documentId: string
  title: string
  locale?: string
  path?: string
}

interface Component {
  category: string
  name: string
  displayName: string
}

const PagesByComponent = () => {
  const [components, setComponents] = useState<Component[]>([])
  const [selectedComponent, setSelectedComponent] = useState<string>('')
  const [locale, setLocale] = useState<string>('sk')
  const [pages, setPages] = useState<Page[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [pageCount, setPageCount] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const { get } = useFetchClient()
  const { toggleNotification } = useNotification()

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const { data } = await get('/api/pages-by-component/components')
        setComponents(data?.components || [])
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error'
        toggleNotification({
          type: 'danger',
          message: `Failed to load components: ${message}`,
        })
      }
    }
    fetchComponents()
  }, [get, toggleNotification])

  const fetchPages = async (
    component: string,
    pageNum: number,
    size: number = pageSize,
    selectedLocale: string = locale
  ) => {
    setLoading(true)
    try {
      const { data } = await get(
        `/api/pages-by-component/pages?component=${encodeURIComponent(
          component
        )}&locale=${encodeURIComponent(
          selectedLocale
        )}&pagination[page]=${pageNum}&pagination[pageSize]=${size}`
      )
      setPages(data?.pages || [])
      setPageCount(data?.pagination?.pageCount || 0)
      setTotal(data?.pagination?.total || 0)
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error'
      toggleNotification({
        type: 'danger',
        message: `Failed to fetch pages: ${message}`,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleComponentChange = async (component: string) => {
    setSelectedComponent(component)
    setPages([])
    setPage(1)
    if (component) {
      await fetchPages(component, 1, pageSize, locale)
    }
  }

  const handlePageChange = async (pageNum: number) => {
    if (selectedComponent) {
      setPage(pageNum)
      await fetchPages(selectedComponent, pageNum, pageSize, locale)
    }
  }

  const handlePageSizeChange = async (newPageSize: number) => {
    if (selectedComponent) {
      setPageSize(newPageSize)
      setPage(1)
      await fetchPages(selectedComponent, 1, newPageSize)
    }
  }

  const handleLocaleChange = async (newLocale: string) => {
    setLocale(newLocale)
    setPage(1)
    if (selectedComponent) {
      await fetchPages(selectedComponent, 1, pageSize, newLocale)
    }
  }

  const getContentManagerUrl = (page: Page) =>
    `/content-manager/collection-types/api::page.page/${page.documentId}`

  const getFrontendUrl = (page: Page) => {
    const pagePath = page.path || ''
    const hostname = typeof window !== 'undefined' ? window.location.hostname : ''

    if (hostname.includes('localhost')) {
      return {
        url: `http://localhost:3000${pagePath}`,
        label: 'Local FE link',
      }
    } else if (hostname.includes('staging')) {
      return {
        url: `https://bratislava-next.staging.bratislava.sk${pagePath}`,
        label: 'Staging FE link',
      }
    } else {
      return {
        url: `https://bratislava.sk${pagePath}`,
        label: 'Production FE link',
      }
    }
  }

  return (
    <>
      <style>
        {`
          .pages-results-container {
            width: 100%;
          }
          @media (min-width: 768px) {
            .pages-results-container {
              width: 800px;
            }
          }
          .pages-results-container table {
            font-size: 14px;
          }
          .pages-results-container tbody tr {
            height: 40px;
          }
          .pages-results-container td {
            padding: 8px 12px;
          }
          .pages-results-container th {
            padding: 8px 12px;
          }
        `}
      </style>
      <Box padding={8}>
        <Flex direction="column" gap={4}>
          <Typography variant="alpha">Pages by section</Typography>
          <Typography variant="omega" textColor="neutral600">
            Find all pages that use a specific component in their sections field
          </Typography>

          <Flex gap={3} alignItems="flex-end">
            <Box style={{ flex: 1 }}>
              <Typography variant="pi" fontWeight="semiBold" marginBottom={2}>
                Section
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
                onChange={(e) => handleComponentChange(e.target.value)}
                disabled={loading}
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
            <Box style={{ width: '6rem' }}>
              <Typography variant="pi" fontWeight="semiBold" marginBottom={2}>
                Locale
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
                value={locale}
                onChange={(e) => handleLocaleChange(e.target.value)}
                disabled={loading}
              >
                <option value="sk">sk</option>
                <option value="en">en</option>
              </select>
            </Box>
          </Flex>

          <Box className="pages-results-container">
            <Flex justifyContent="space-between" alignItems="end" marginBottom={2}>
              <Typography variant="omega" textColor="neutral600">
                Showing {Math.min((page - 1) * pageSize + 1, total)} -{' '}
                {Math.min(page * pageSize, total)} of {total}
              </Typography>
              <Flex gap={4} alignItems="center">
                <Flex gap={1} alignItems="center">
                  <Typography variant="omega" textColor="neutral600">
                    Page size:
                  </Typography>
                  <select
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #dcdce4',
                      borderRadius: '4px',
                      fontSize: '14px',
                      backgroundColor: 'white',
                    }}
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                    disabled={loading || !selectedComponent}
                  >
                    {[10, 50, 100, 500, 1000].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </Flex>
                <Flex gap={2} alignItems="center">
                  <IconButton
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1 || loading}
                    label="Previous page"
                  >
                    <ChevronLeft />
                  </IconButton>
                  <Typography variant="omega">
                    Page {page} of {pageCount}
                  </Typography>
                  <IconButton
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pageCount || loading}
                    label="Next page"
                  >
                    <ChevronRight />
                  </IconButton>
                </Flex>
              </Flex>
            </Flex>
            <Table colCount={4} rowCount={pages.length}>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">Title</Typography>
                  </Th>
                  <Th style={{ width: '60px', maxWidth: '60px' }}>
                    <Typography variant="sigma">Locale</Typography>
                  </Th>
                  <Th
                    style={{
                      width: '100px',
                      maxWidth: '100px',
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    }}
                  >
                    <Typography variant="sigma">Strapi edit link</Typography>
                  </Th>
                  <Th
                    style={{
                      width: '100px',
                      maxWidth: '100px',
                      whiteSpace: 'normal',
                      wordWrap: 'break-word',
                    }}
                  >
                    <Typography variant="sigma">Frontend Link</Typography>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {pages.map((pageItem) => {
                  const frontendLink = getFrontendUrl(pageItem)
                  const contentManagerUrl = getContentManagerUrl(pageItem)

                  return (
                    <Tr key={pageItem.documentId}>
                      <Td>
                        <Typography variant="omega">{pageItem.title}</Typography>
                      </Td>
                      <Td style={{ width: '60px', maxWidth: '60px' }}>
                        <Typography variant="omega">{pageItem.locale || 'N/A'}</Typography>
                      </Td>
                      <Td style={{ width: '100px', maxWidth: '100px' }}>
                        <Link
                          to={contentManagerUrl}
                          style={{ textDecoration: 'none', fontSize: '11px' }}
                        >
                          <Typography
                            variant="omega"
                            textColor="primary600"
                            style={{
                              wordBreak: 'break-all',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {contentManagerUrl}
                          </Typography>
                        </Link>
                      </Td>
                      <Td style={{ width: '50px', maxWidth: '50px' }}>
                        <a
                          href={frontendLink.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ textDecoration: 'none', fontSize: '11px' }}
                        >
                          <Typography
                            variant="omega"
                            textColor="primary600"
                            style={{
                              wordBreak: 'break-all',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {frontendLink.url}
                          </Typography>
                        </a>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default PagesByComponent
