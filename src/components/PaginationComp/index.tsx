import { Pagination } from 'react-bootstrap'

import { useTopicListStore } from '../../stores/topic'
import { useNavigate, useSearchParams } from 'react-router-dom'
import React from 'react'

const PaginationComp: React.FC = () => {
  const navigate = useNavigate()
  const { total = 0 } = useTopicListStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'

  const generatePageList = (
    total: number,
    current: number,
    pageSize: number = 10
  ) => {
    let pageList: any[] = []
    pageList.push(
      <Pagination.First
        disabled={1 === current}
        onClick={e => handlePageChange(e, 1, 1 === current)}
      />
    )
    const totalPage = Math.ceil(total / pageSize)

    if (totalPage === 0) {
      return []
    } else if (totalPage === 1) {
      pageList.push(
        <>
          <Pagination.Prev disabled />
          <Pagination.Item active>
            {1}
          </Pagination.Item>
          <Pagination.Next disabled />
          <Pagination.Last disabled />
        </>
      )
      return pageList
    } else if (totalPage <= 9) {
      pageList.push(
        <Pagination.Prev
          disabled={1 === current}
          onClick={e => handlePageChange(e, current - 1, 1 === current)}
        />
      )
      for (let i = 1; i <= totalPage; i++) {
        pageList.push(
          <Pagination.Item
            active={i === current}
            key={i}
            onClick={e => handlePageChange(e, i, i === current)}
          >
            {i}
          </Pagination.Item>
        )
      }
      pageList.push(
        <Pagination.Next
          disabled={totalPage === current}
          onClick={e => handlePageChange(e, current + 1, totalPage === current)}
        />
      )

      pageList.push(
        <Pagination.Last
          disabled={totalPage === current}
          onClick={e => handlePageChange(e, totalPage, totalPage === current)}
        />
      )
      return pageList
    } else {
      pageList.push(
        <Pagination.Prev
          disabled={1 === current}
          onClick={e => handlePageChange(e, current - 1, 1 === current)}
        />
      )

      if (current <= 5) {
        const j = current + 2 <= 5 ? 5 : current + 2
        for (let i = 1; i <= j; i++) {
          pageList.push(
            <Pagination.Item
              active={i === current}
              key={i}
              onClick={e => handlePageChange(e, i, i === current)}
            >
              {i}
            </Pagination.Item>
          )
        }
        pageList.push(
          <>
            <Pagination.Ellipsis />
            <Pagination.Item onClick={e => handlePageChange(e, totalPage, false)}>
              {totalPage}
            </Pagination.Item>
            <Pagination.Next onClick={e => handlePageChange(e, current + 1, false)} />
          </>
        )

        pageList.push(
          <Pagination.Last
            disabled={totalPage === current}
            onClick={e => handlePageChange(e, totalPage, totalPage === current)}
          />
        )
        return pageList
      } else if (current >= totalPage - 4) {
        const j = current - 2 >= totalPage - 4 ? totalPage - 4 : current - 2
        pageList.push(
          <>
            <Pagination.Item onClick={e => handlePageChange(e, 1, false)}>{1}</Pagination.Item>
            <Pagination.Ellipsis />
          </>
        )
        for (let i = j; i <= totalPage; i++) {
          pageList.push(
            <Pagination.Item
              active={i === current}
              key={i}
              onClick={e => handlePageChange(e, i, i === current)}
            >
              {i}
            </Pagination.Item>
          )
        }
        pageList.push(
          <Pagination.Next
            disabled={totalPage === current}
            onClick={e => handlePageChange(e, current + 1, totalPage === current)}
          />
        )

        pageList.push(
          <Pagination.Last
            disabled={totalPage === current}
            onClick={e => handlePageChange(e, totalPage, totalPage === current)}
          />
        )
        return pageList
      } else {
        pageList.push(
          <>
            <Pagination.Item onClick={e => handlePageChange(e, 1, false)}>{1}</Pagination.Item>
            <Pagination.Ellipsis />
          </>
        )
        for (let i = current - 2; i <= current + 2; i++) {
          pageList.push(
            <Pagination.Item
              active={i === current}
              key={i}
              onClick={e => handlePageChange(e, i, i === current)}
            >
              {i}
            </Pagination.Item>
          )
        }
        pageList.push(
          <>
            <Pagination.Ellipsis />
            <Pagination.Item onClick={e => handlePageChange(e, totalPage, false)}>
              {totalPage}
            </Pagination.Item>
            <Pagination.Next onClick={e => handlePageChange(e, current + 1, false)} />
          </>
        )

        pageList.push(
          <Pagination.Last
            disabled={totalPage === current}
            onClick={e => handlePageChange(e, totalPage, totalPage === current)}
          />
        )
        return pageList
      }
    }
  }

  const handlePageChange = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    page: number,
    disabled: boolean
  ) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled) return

    if (1 === page) {
      searchParams.delete('page')
      setSearchParams(searchParams)
    } else {
      searchParams.set('page', page.toString())
      setSearchParams(searchParams)
    }
    navigate({
      search: searchParams.toString()
    })
  }

  return (
    <div className="topicPagination">
      <Pagination>{...generatePageList(total, parseInt(page))}</Pagination>
    </div>
  )
}

export default PaginationComp
