import { Box, Button, HStack } from "@chakra-ui/react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const PAGE_SIZE = 5; // Number of cells to display per page

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Calculate the range of pages to display based on the current page
  const pageRange = {
    start: Math.max(1, currentPage - Math.floor(PAGE_SIZE / 2)),
    end: Math.min(totalPages, currentPage + Math.ceil(PAGE_SIZE / 2) - 1),
  };

  // Generate the page buttons
  const pageButtons = [];
  for (let i = pageRange.start; i <= pageRange.end; i++) {
    pageButtons.push(
      <Button
        key={i}
        variant={i === currentPage ? "solid" : "ghost"}
        onClick={() => onPageChange(i)}
      >
        {i}
      </Button>
    );
  }

  return (
    <HStack spacing={2} justify="center">
      <Button
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        leftIcon={<AiOutlineArrowLeft />}
      >
        Previous
      </Button>
      {pageRange.start > 1 && (
        <>
          <Button
            variant="ghost"
            onClick={() => onPageChange(pageRange.start - 2)}
          >
            {pageRange.start - 1}
          </Button>
          {pageRange.start > 2 && (
            <Box as="span" fontSize="sm">
              &hellip;
            </Box>
          )}
        </>
      )}
      {pageButtons}
      {pageRange.end < totalPages && (
        <>
          {pageRange.end < totalPages - 1 && (
            <Box as="span" fontSize="sm">
              &hellip;
            </Box>
          )}
          <Button
            variant="ghost"
            onClick={() => onPageChange(pageRange.end + 1)}
          >
            {pageRange.end + 1}
          </Button>
        </>
      )}
      <Button
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        rightIcon={<AiOutlineArrowRight />}
      >
        Next
      </Button>
    </HStack>
  );
}

export default Pagination
