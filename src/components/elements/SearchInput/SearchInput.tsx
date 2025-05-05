'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ListGroup, ListGroupItem, ModalBody, ModalHeader } from 'react-bootstrap'

import clsx from 'clsx'
import Link from 'next/link'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FaSearch } from 'react-icons/fa'

import { useSearchStore } from '@/store/useSearchStore'
import { debounce } from '@/tools/debounce'

import cls from './SearchInput.module.scss'

export const SearchInput = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [show, setShow] = useState(false)

  const {
    data,
    error,
    isFetching,
    onChangeSearchValue,
    searchValue,
    fetch,
  } = useSearchStore()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const fetchDebounced = useMemo(
    () => debounce(fetch, 400),
    [fetch],
  )

  useEffect(() => {
    if (searchValue) {
      fetchDebounced(searchValue)
    }
  }, [searchValue])

  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus()
    }
  }, [show])

  return (
    <div className={cls.root}>
      <Button
        variant="outline-secondary"
        id="button-addon2"
        onClick={handleShow}
        className={cls.open_btn}
      >
        🔍 Search City...
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        className="p-2"
      >
        <ModalHeader>
          <div className={clsx(cls.search, 'input-group')}>
            <span
              id="button-addon2"
              className={clsx(cls.formIcon, 'input-group-text')}
            >
              <FaSearch />
            </span>
            <input
              type="text"
              className={clsx(cls.formControl, 'form-control')}
              placeholder="Search City..."
              ref={inputRef}
              aria-label="Search City"
              aria-describedby="basic-addon2"
              onChange={(e) => onChangeSearchValue(e.target.value)}
            />
          </div>
        </ModalHeader>

        <ModalBody>
          {isFetching && (
            <p className="text-center p-4 m-0">Loading…</p>
          )}

          {!error && !isFetching && (!data || data.length === 0) && (
            <p className="text-center p-4 m-0">No City found.</p>
          )}

          {error && !isFetching && <p className="text-center p-4 m-0">There has been an error! Please refresh the page!.</p>}

          {!isFetching && data && data.length > 0 && (
            <ListGroup className={cls.list}>
              {data.map((city) => (
                <Link
                  key={`${city.lat}-${city.lon}`}
                  href={`/search/${city.name}?name=${city.name}&lat=${city.lat}&lon=${city.lon}`}
                  onClick={handleClose}
                >
                  <ListGroupItem
                    className={cls.list_item}
                    key={`${city.lat}-${city.lon}`}
                  >
                    {city.name}, {city.country}
                  </ListGroupItem>
                </Link>
              ))}
            </ListGroup>
          )}
        </ModalBody>
      </Modal>
    </div>
  )
}
